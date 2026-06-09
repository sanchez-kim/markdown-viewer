# EasyMD (이지 마크다운) — 프로젝트 가이드

브라우저에서 바로 쓰는 무료 마크다운 에디터. 설치·로그인 없이 동작하며 모든 데이터는 브라우저(localStorage)에만 저장된다.

- **배포**: https://easy-md.com (Netlify, `main` 브랜치 push 시 자동 배포)
- **스택**: SvelteKit 2 (Svelte 5 룬) · adapter-static(전체 prerender) · Tiptap 3(WYSIWYG 에디터) · marked · TypeScript

## 개발 명령

```bash
npm install
npm run dev          # 개발 서버 (포트 3080)
npm run build         # 프로덕션 빌드 (build/ 에 정적 산출)
npm run preview       # 빌드 결과 미리보기 (포트 4173)

npm run lint          # ESLint
npm run format        # Prettier 자동 포맷 / format:check 는 검사만
npm run check         # svelte-check (타입). ⚠️ 알려진 타입 에러 8건 있음(점진 정리 대상)
npm run test:e2e      # Playwright E2E 스모크 (build+preview 자동 기동)
```

배포: `main`에 push → Netlify가 자동 빌드·배포. 별도 배포 명령 없음.

## 품질·테스트

안정성 장치(2026-06-09 도입). 핵심 철학: **"빌드는 통과하는데 동작이 망가지는" 버그**(예: 이번에 겪은, SEO 섹션이 에디터를 덮어 타이핑이 안 되던 버그)를 잡는 것. 이런 건 타입체크로는 못 잡으므로 **E2E 스모크**가 가장 중요하다.

- **CI**: `.github/workflows/ci.yml` — `main` push/PR 시 자동 실행.
  - `quality` 잡: `lint`(차단) + `check`(비차단, 타입 경고 가시화) + `build`(차단)
  - `e2e` 잡: Playwright 스모크(차단). 여기서 깨지면 Netlify 배포 전에 막힌다.
- **E2E** (`e2e/smoke.spec.ts`): 에디터 타이핑·랜딩→에디터 진입·블로그 목록/필터·글 렌더·브랜드 헤더. 회귀가 발생했던 흐름 위주. 새 핵심 기능 추가 시 여기에 스모크 한 줄 더하는 걸 권장.
- **ESLint**(`eslint.config.js`): 초기 코드베이스라 휴리스틱 오탐·스타일 규칙은 완화(warn/off)했고, 실제 버그성 규칙만 error. 남은 warning(약 53건)은 점진 정리 대상.
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
- **readingTime**(선택): 생략 시 본문 길이로 자동 계산.
- **HTML 예시를 보여줄 때**는 반드시 코드펜스(```) 안에 넣을 것. 펜스 밖의 `<태그>`는 실제로 렌더된다.

추가하면 블로그 목록·sitemap·카테고리 필터에 자동 반영된다(별도 등록 불필요).

## 데이터·상태

- 문서 저장: `src/lib/stores/documents.ts` (localStorage, 다중 문서·버전 히스토리). 에디터는 **상시 자동저장**(변경 1.2초 후).
- 테마: `src/lib/stores/theme.ts` (`html.dark` 클래스 토글, light/dark/auto).
- 로더: `src/lib/data/posts.ts` (`import.meta.glob`로 `posts/*.md` 수집 → frontmatter 파싱 + `marked` 렌더 + 최신순 정렬). API: `posts`, `getPost(slug)`, `getAllSlugs()`.
