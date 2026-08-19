# EasyMD (이지 마크다운) — 프로젝트 가이드

브라우저에서 바로 쓰는 무료 마크다운 에디터. 설치·로그인 없이 동작하며 모든 데이터는 브라우저(localStorage)에만 저장된다.

- **배포**: https://easy-md.com (Netlify, `main` 브랜치 push 시 자동 배포)
- **스택**: SvelteKit 2 (Svelte 5 룬) · adapter-static(전체 prerender) · Tiptap 3(WYSIWYG 에디터) · marked · TypeScript
- **Git 워크플로우**: `main` 직접 push 금지, PR 필수 (아래 "Git 워크플로우" 참고)

## 개발 명령

```bash
npm install
npm run dev          # 개발 서버 (포트 3080)
npm run build         # 프로덕션 빌드 (build/ 에 정적 산출)
npm run preview       # 빌드 결과 미리보기 (포트 4173)

npm run lint          # ESLint
npm run format        # Prettier 자동 포맷 / format:check 는 검사만
npm run check         # svelte-check (타입). 0 errors / 0 warnings 유지
npm run test:e2e      # Playwright E2E 스모크 (build+preview 자동 기동)
```

배포: `main`에 push → Netlify가 자동 빌드·배포. 별도 배포 명령 없음.

## Git 워크플로우 (2026-06-18 도입)

`main` push = 즉시 프로덕션 배포이므로, 실수로 검증 안 된 변경이 바로 라이브에 나가는 걸 막기 위해 PR 기반 흐름을 쓴다.

- **`main`에 직접 push 금지.** 브랜치 만들고 PR을 올려서 병합할 것. 저장소가 Public이라 GitHub 브랜치 보호 규칙이 무료로 적용되어 있음(`main`): PR 필수, CI 체크(`Lint · Typecheck · Build`, `E2E 스모크 (Playwright)`) 통과 필수, 리포지토리 관리자도 예외 없음(`enforce_admins`). 승인 리뷰어 수는 0(1인 프로젝트라 셀프 머지 가능, CI 통과만 게이트).
- **PR을 올리면 Netlify가 자동으로 Deploy Preview URL을 생성**한다(무료 플랜 기본 포함, 별도 설정 불필요). PR 코멘트/Netlify 대시보드에서 프리뷰 링크 확인 → 실제로 확인 후 이상 없으면 머지.
- 머지되면 그때 `main`이 갱신되고 Netlify가 프로덕션에 배포한다.
- 브랜치 보호 규칙은 GitHub 저장소 설정(`Settings → Branches`)에 있으며, `gh api repos/{owner}/{repo}/branches/main/protection`으로 조회·수정 가능.

## 품질·테스트

안정성 장치(2026-06-09 도입). 핵심 철학: **"빌드는 통과하는데 동작이 망가지는" 버그**(예: 이번에 겪은, SEO 섹션이 에디터를 덮어 타이핑이 안 되던 버그)를 잡는 것. 이런 건 타입체크로는 못 잡으므로 **E2E 스모크**가 가장 중요하다.

- **CI**: `.github/workflows/ci.yml` — `main` push/PR 시 자동 실행.
  - `quality` 잡: `lint` + `check` + `build` (모두 차단)
  - `e2e` 잡: Playwright 스모크(차단). 여기서 깨지면 Netlify 배포 전에 막힌다.
- **E2E** (`e2e/smoke.spec.ts`): 에디터 타이핑·랜딩→에디터 진입·블로그 목록/필터·글 렌더·브랜드 헤더. 회귀가 발생했던 흐름 위주. 새 핵심 기능 추가 시 여기에 스모크 한 줄 더하는 걸 권장.
- **ESLint**(`eslint.config.js`): 휴리스틱 오탐·과한 스타일 규칙은 완화(off)했고 실제 버그성 규칙만 활성. 현재 0 warning. 의도적 a11y 패턴(모달 오버레이 클릭닫기, 헤더 자동숨김 등)은 `<!-- svelte-ignore a11y_* -->`로 명시 억제.
- **Prettier**(`.prettierrc`): 탭·싱글쿼트. `src/lib/posts/`와 `*.md`는 포맷 제외.

## 페이지 구조 (`src/routes/`)

| 경로 | 파일 | 설명 |
|---|---|---|
| `/` | `+page.svelte` | **랜딩 페이지** (마케팅·소개 콘텐츠, 자체 헤더). 에디터 아님 |
| `/editor` | `editor/+page.svelte` | **에디터 앱** (Tiptap WYSIWYG, 약 3,000줄) |
| `/blog`, `/blog/[slug]` | `blog/` | 블로그 목록·상세 |
| `/guide`, `/faq`, `/about`, `/compare`, `/templates`, `/use-cases`, `/shortcuts`, `/changelog`, `/privacy`, `/terms` | 각 폴더 | 콘텐츠·정책 페이지 |
| `/sitemap.xml`, `/robots.txt` | `*/+server.ts` | 빌드 시 자동 생성(`posts` 기반) |

`+layout.svelte`는 `/`·`/editor`를 제외한 모든 페이지에 **통일 브랜드 헤더**를 자동으로 붙인다.

## 핵심 관례 (꼭 지킬 것)

1. **도메인은 `src/lib/config.ts`의 `SITE_URL` 한 곳에서 관리.** canonical·OG·JSON-LD·sitemap·robots가 모두 이 값을 참조한다. 도메인 변경 시 여기만 수정.

2. **블로그 글은 `src/lib/posts/*.md` 마크다운 파일** (아래 "블로그 글 추가" 참고). `posts.ts`는 이 파일들을 모으는 로더일 뿐, 글 내용을 직접 넣지 않는다.

3. **에디터(`/editor`)의 `.app`은 `height:100vh` flex 컨테이너.** 보조 콘텐츠(소개 섹션, footer 등)를 `.app` **안에** 넣으면 에디터를 덮어 클릭·입력을 가로채는 치명적 버그가 난다. 보조 콘텐츠는 반드시 `.app` **바깥**에 둘 것.

4. **로고(`static/logo.svg`)는 흰색.** 보라 그라데이션 헤더(에디터)에선 잘 보이지만, **흰 배경 헤더(랜딩·콘텐츠 페이지)에서는 그라데이션 배지 배경**으로 감싸야 보인다.

5. **전체 prerender**(`+layout.js`의 `prerender = true`). 브라우저 전용 API(Tiptap·localStorage·DOMPurify)는 `onMount`/`browser` 가드 안에서만 사용.

6. **canonical·OG 공통 태그는 `+layout.svelte`에서만 선언.** `svelte:head`는 중복 제거를 하지 않아서, 개별 페이지에서 같은 태그를 또 쓰면 HTML에 두 번 나간다. 레이아웃이 담당하는 것: `canonical`, `og:url`, `og:type`(블로그 글만 article), `og:image`, `og:site_name`, `og:locale`, `twitter:card`, `twitter:image`. 개별 페이지는 **`og:title`·`og:description`만** 선언한다.

7. **`svelte.config.js`의 `fallback`은 `404.html`이어야 한다.** `200.html`로 두면 존재하지 않는 URL도 HTTP 200 + 빈 셸을 반환해 검색엔진에 소프트 404가 된다. 모든 라우트가 prerender되므로 fallback은 오탈자 URL 전용이다. (E2E 스모크가 이 회귀를 감시한다.)

8. **한글 조사 앞 볼드 주의.** `**앵커(anchor)**를`처럼 볼드가 **문장부호로 끝나고 바로 한글 조사**가 붙으면 CommonMark 규칙상 볼드가 닫히지 않아 `**`가 화면에 그대로 노출된다. `**앵커(anchor)를**`처럼 조사를 볼드 안에 넣을 것.

## 블로그 글 추가 방법

`src/lib/posts/<slug>.md` 파일 **하나만 추가**하면 끝. 파일명이 URL slug가 되고, 빌드 시 자동 수집·렌더된다(이스케이프 걱정 없는 진짜 마크다운).

```markdown
---
title: 글 제목
category: 빠른 팁
date: 2026-06-09
readingTime: 3
excerpt: 목록·검색에 노출되는 한 줄 요약
---

## 본문

진짜 마크다운으로 작성한다. `**굵게**`, 목록, 표, 코드 블록 모두 그대로.
```

- **category**: 현재 4종 — `문법 가이드` · `빠른 팁` · `플랫폼 활용` · `실전 활용`. 새 분류는 신중히(난립 주의).
- **date**: `YYYY-MM-DD`. 목록은 최신순 정렬.
- **updated**(선택): 발행 후 본문을 의미 있게 고쳤을 때만 `YYYY-MM-DD`로 추가. sitemap `lastmod`와 JSON-LD `dateModified`에 반영된다. 없으면 `date`와 동일하게 취급.
- **readingTime**(선택): 생략 시 본문 길이로 자동 계산.
- **HTML 예시를 보여줄 때**는 반드시 코드펜스(```) 안에 넣을 것. 펜스 밖의 `<태그>`는 실제로 렌더된다.

추가하면 블로그 목록·sitemap·카테고리 필터에 자동 반영된다(별도 등록 불필요).

## 데이터·상태

- 문서 저장: `src/lib/stores/documents.ts` (localStorage, 다중 문서·버전 히스토리). 에디터는 **상시 자동저장**(변경 1.2초 후).
- 테마: `src/lib/stores/theme.ts` (`html.dark` 클래스 토글, light/dark/auto).
- 로더: `src/lib/data/posts.ts` (`import.meta.glob`로 `posts/*.md` 수집 → frontmatter 파싱 + `marked` 렌더 + 최신순 정렬). API: `posts`, `getPost(slug)`, `getAllSlugs()`.
