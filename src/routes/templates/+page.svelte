<script lang="ts">
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme';

	onMount(() => {
		document.title = '마크다운 템플릿 모음 - 이지 마크다운';
		themeStore.init();
	});

	interface Template {
		id: string;
		emoji: string;
		title: string;
		desc: string;
		tags: string[];
		content: string;
	}

	const templates: Template[] = [
		{
			id: 'til',
			emoji: '📚',
			title: 'TIL — Today I Learned',
			desc: '개발자를 위한 오늘 배운 것 기록 노트. 날짜별로 꾸준히 쌓아가는 학습 로그.',
			tags: ['개발', 'TIL', '학습 기록'],
			content: `# TIL — 2024-01-15

## 오늘 배운 것 (Today I Learned)

### 주제: [배운 주제를 입력하세요]

#### 배경 (Context)
- 왜 이 내용을 공부하게 됐는지
- 어떤 문제를 해결하려 했는지

#### 핵심 내용 (Key Takeaways)
- 포인트 1
- 포인트 2
- 포인트 3

#### 코드 예시 (Code Example)

\`\`\`javascript
// 예시 코드를 여기에 작성하세요
const example = "Hello, World!";
console.log(example);
\`\`\`

#### 참고 자료 (References)
- [공식 문서](https://example.com)
- [참고한 블로그](https://example.com)

#### 느낀 점 / 다음 할 것
- [ ] 추가로 공부할 내용
- [ ] 실제 프로젝트에 적용해보기

---
*작성일: 2024-01-15 | 태그: #JavaScript #TIL*`
		},
		{
			id: 'readme',
			emoji: '📂',
			title: 'GitHub README',
			desc: '오픈소스 프로젝트를 위한 전문적인 README 템플릿. 설치부터 기여 방법까지.',
			tags: ['GitHub', 'README', 'Open Source'],
			content: `# 프로젝트명 (Project Name)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)]()

> 한 줄 프로젝트 설명을 여기에 작성하세요.

## ✨ 주요 기능 (Features)

- ⚡ 기능 1 — 간략한 설명
- 🎨 기능 2 — 간략한 설명
- 🔒 기능 3 — 간략한 설명

## 🚀 시작하기 (Getting Started)

### 사전 요구사항 (Prerequisites)

\`\`\`bash
node >= 18.0.0
npm >= 9.0.0
\`\`\`

### 설치 (Installation)

\`\`\`bash
# 저장소 클론
git clone https://github.com/username/project-name.git

# 디렉토리 이동
cd project-name

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
\`\`\`

## 📖 사용법 (Usage)

\`\`\`javascript
import { example } from 'project-name';

const result = example({ option: 'value' });
console.log(result);
\`\`\`

## 🗂️ 프로젝트 구조 (Project Structure)

\`\`\`
project-name/
├── src/
│   ├── components/
│   ├── utils/
│   └── index.js
├── tests/
├── docs/
└── README.md
\`\`\`

## 🤝 기여하기 (Contributing)

1. 이 저장소를 Fork 합니다
2. 기능 브랜치를 만듭니다 (\`git checkout -b feature/amazing-feature\`)
3. 변경 사항을 커밋합니다 (\`git commit -m 'Add amazing feature'\`)
4. 브랜치에 Push 합니다 (\`git push origin feature/amazing-feature\`)
5. Pull Request를 엽니다

## 📄 라이선스 (License)

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 확인하세요.

## 📬 문의 (Contact)

홍길동 — [@username](https://twitter.com/username) — email@example.com

프로젝트 링크: [https://github.com/username/project-name](https://github.com/username/project-name)`
		},
		{
			id: 'apidoc',
			emoji: '🔧',
			title: '기술 문서 / API 문서',
			desc: 'REST API 엔드포인트 명세서 및 기술 문서 작성을 위한 표준 템플릿.',
			tags: ['API', '기술 문서', 'REST'],
			content: `# API 문서 — 서비스명 API v1.0

**Base URL**: \`https://api.example.com/v1\`

**인증 (Authentication)**: 모든 요청에 Bearer 토큰 필요

\`\`\`
Authorization: Bearer {your-api-token}
\`\`\`

---

## 엔드포인트 목록 (Endpoints)

### 1. 사용자 목록 조회

**GET** \`/users\`

사용자 목록을 페이지네이션과 함께 반환합니다.

#### 쿼리 파라미터 (Query Parameters)

| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| \`page\` | integer | 아니오 | 페이지 번호 (기본값: 1) |
| \`limit\` | integer | 아니오 | 페이지당 항목 수 (기본값: 20) |
| \`search\` | string | 아니오 | 검색 키워드 |

#### 응답 예시 (Response)

\`\`\`json
{
  "status": "success",
  "data": {
    "users": [
      {
        "id": "usr_123",
        "name": "홍길동",
        "email": "user@example.com",
        "createdAt": "2024-01-15T09:00:00Z"
      }
    ],
    "pagination": {
      "total": 100,
      "page": 1,
      "limit": 20
    }
  }
}
\`\`\`

#### 에러 코드 (Error Codes)

| 코드 | 설명 |
|------|------|
| \`400\` | 잘못된 요청 파라미터 |
| \`401\` | 인증 실패 |
| \`403\` | 권한 없음 |
| \`429\` | 요청 한도 초과 (Rate Limit) |

---

### 2. 사용자 생성

**POST** \`/users\`

새 사용자를 생성합니다.

#### 요청 본문 (Request Body)

\`\`\`json
{
  "name": "홍길동",
  "email": "user@example.com",
  "password": "securePassword123!"
}
\`\`\`

#### 응답 (Response)

- \`201 Created\` — 생성 성공
- \`409 Conflict\` — 이메일 중복

---

## 변경 이력 (Changelog)

| 버전 | 날짜 | 변경 내용 |
|------|------|-----------|
| v1.1 | 2024-02-01 | 검색 필터 추가 |
| v1.0 | 2024-01-01 | 최초 릴리즈 |`
		},
		{
			id: 'meeting',
			emoji: '📋',
			title: '회의록 (Meeting Notes)',
			desc: '효과적인 회의 기록을 위한 구조화된 템플릿. 결정 사항과 액션 아이템을 명확하게.',
			tags: ['회의', '팀', '업무'],
			content: `# 회의록

## 기본 정보

| 항목 | 내용 |
|------|------|
| **일시** | 2024-01-15 (월) 14:00 ~ 15:30 |
| **장소** | 회의실 A / Zoom 온라인 |
| **참석자** | 김철수, 이영희, 박민준, 최수아 |
| **작성자** | 홍길동 |
| **다음 회의** | 2024-01-22 (월) 14:00 |

---

## 안건 (Agenda)

1. 1분기 로드맵 검토
2. 신규 기능 우선순위 결정
3. 리소스 배분 논의
4. 기타

---

## 논의 내용 (Discussion)

### 1. 1분기 로드맵 검토

- 현재 진행 상황: **전체 진척률 65%**
- 주요 이슈: API 응답 속도 개선이 예상보다 지연됨
- 해결 방안: 캐싱 레이어 도입 검토 (담당: 김철수)

### 2. 신규 기능 우선순위

우선순위 결정 결과:
1. **다크 모드** — 사용자 요청 최다, 이번 스프린트 포함
2. **CSV 내보내기** — 다음 스프린트
3. **알림 기능** — 2분기로 이월

### 3. 리소스 배분

- 프론트엔드 인력 1명 추가 투입 결정
- 백엔드 병목 해소를 위한 아키텍처 개선 세션 별도 진행

---

## 결정 사항 (Decisions)

- [x] 다크 모드를 이번 스프린트에 포함
- [x] 캐싱 도입을 위한 기술 검토 착수
- [x] 다음 회의에서 2분기 계획 확정

---

## 액션 아이템 (Action Items)

| 담당자 | 할 일 | 기한 |
|--------|-------|------|
| 김철수 | Redis 캐싱 도입 기술 검토 | 2024-01-19 |
| 이영희 | 다크 모드 UI 시안 작성 | 2024-01-17 |
| 박민준 | 2분기 로드맵 초안 작성 | 2024-01-22 |

---

## 다음 회의 안건 예정

- 2분기 로드맵 확정
- 다크 모드 UI 리뷰`
		},
		{
			id: 'project-plan',
			emoji: '🗺️',
			title: '프로젝트 기획서',
			desc: '신규 프로젝트 시작 시 작성하는 기획 문서. 목표, 일정, 리스크까지 포함.',
			tags: ['기획', '프로젝트', 'PM'],
			content: `# 프로젝트 기획서

**프로젝트명**: [프로젝트 이름]
**작성일**: 2024-01-15
**작성자**: 홍길동
**버전**: v1.0

---

## 1. 프로젝트 개요 (Overview)

### 배경 및 목적
이 프로젝트는 [문제 상황]을 해결하기 위해 시작되었습니다.
현재 [현황 설명]으로 인해 [불편함/비효율]이 발생하고 있으며,
이를 개선하여 [목표 상태]를 달성하고자 합니다.

### 핵심 목표 (Goals)
- **Primary**: [핵심 목표]
- **Secondary**: [보조 목표 1]
- **Secondary**: [보조 목표 2]

### 범위 (Scope)

**포함 (In Scope)**
- 기능 A
- 기능 B
- 기능 C

**제외 (Out of Scope)**
- 기능 X (추후 단계에서 진행)
- 기능 Y (별도 프로젝트)

---

## 2. 이해관계자 (Stakeholders)

| 역할 | 이름 | 책임 |
|------|------|------|
| 프로젝트 오너 | 김철수 | 최종 의사결정 |
| PM | 이영희 | 일정/리소스 관리 |
| 개발 리드 | 박민준 | 기술 아키텍처 |
| 디자인 | 최수아 | UI/UX 설계 |

---

## 3. 일정 (Timeline)

\`\`\`
[기획 / 설계]  ████████░░░░░░░░░░  1월 1일 ~ 1월 15일
[개발 - Phase 1] ░░░░████████░░░░░░  1월 16일 ~ 2월 15일
[개발 - Phase 2] ░░░░░░░░████████░░  2월 16일 ~ 3월 15일
[QA / 테스트]   ░░░░░░░░░░░░████░░  3월 16일 ~ 3월 31일
[출시]          ░░░░░░░░░░░░░░░░██  4월 1일
\`\`\`

### 마일스톤

| 마일스톤 | 날짜 | 완료 기준 |
|----------|------|-----------|
| 기획 완료 | 2024-01-15 | 기획서 승인 |
| MVP 개발 완료 | 2024-02-15 | 핵심 기능 동작 확인 |
| 베타 출시 | 2024-03-15 | 내부 사용자 테스트 |
| 정식 출시 | 2024-04-01 | 전체 기능 배포 |

---

## 4. 리소스 (Resources)

### 팀 구성
- 개발: 3명
- 디자인: 1명
- QA: 1명 (파트타임)

### 예산
- 개발 비용: ₩ XX,XXX,XXX
- 인프라 비용: 월 ₩ X,XXX,XXX
- 기타: ₩ X,XXX,XXX

---

## 5. 리스크 관리 (Risk Management)

| 리스크 | 가능성 | 영향도 | 대응 방안 |
|--------|--------|--------|-----------|
| 일정 지연 | 중 | 상 | 버퍼 기간 2주 확보 |
| 기술적 어려움 | 저 | 상 | PoC 선진행 |
| 요구사항 변경 | 상 | 중 | 스프린트 단위 검토 |

---

## 6. 성공 지표 (KPI)

- [ ] 출시 후 1개월 내 MAU 1,000명 달성
- [ ] 사용자 만족도(CSAT) 4.0 / 5.0 이상
- [ ] 시스템 가용성(Uptime) 99.9% 유지
- [ ] 페이지 로드 타임 3초 이내`
		},
		{
			id: 'blog',
			emoji: '✍️',
			title: '블로그 포스트',
			desc: '기술 블로그, 개인 블로그 포스트를 위한 완성도 높은 글쓰기 템플릿.',
			tags: ['블로그', '글쓰기', '콘텐츠'],
			content: `---
title: "[포스트 제목을 입력하세요]"
date: 2024-01-15
tags: [JavaScript, Web, Tips]
categories: [개발]
description: "이 포스트의 핵심 내용을 한두 문장으로 요약하세요. 검색엔진 및 SNS 공유 시 표시됩니다."
---

# [포스트 제목을 입력하세요]

> 💡 **한 줄 요약**: 이 글의 핵심 메시지를 한 문장으로 씁니다.

---

## 들어가며

이 글을 쓰게 된 배경이나 동기를 설명합니다.
독자가 이 글을 읽고 나서 무엇을 얻게 될지 미리 알려주세요.

**이 글에서 다루는 내용:**
- 개념 A의 이해
- 실제 사용 예시
- 주의해야 할 점

---

## 본론

### 첫 번째 소주제

여기에 본론 내용을 작성합니다. 핵심 개념을 설명하고,
구체적인 예시를 들어 독자의 이해를 돕습니다.

\`\`\`javascript
// 코드 예시
function example() {
  console.log("코드 예시를 여기에 작성하세요");
}
\`\`\`

### 두 번째 소주제

두 번째 핵심 내용을 작성합니다.

| 비교 항목 | 방법 A | 방법 B |
|-----------|--------|--------|
| 성능 | ⭐⭐⭐ | ⭐⭐ |
| 가독성 | ⭐⭐ | ⭐⭐⭐ |
| 유지보수 | ⭐⭐⭐ | ⭐⭐⭐ |

### 주의사항

> ⚠️ **주의**: 독자가 특히 주의해야 할 사항이 있으면 여기에 인용구로 강조합니다.

- 주의사항 1
- 주의사항 2
- 주의사항 3

---

## 마무리

이 글에서 배운 핵심 내용을 정리합니다.

- **핵심 1**: 요약 내용
- **핵심 2**: 요약 내용
- **핵심 3**: 요약 내용

다음 글에서는 [다음 주제]에 대해 다룰 예정입니다.
도움이 되셨다면 공유 부탁드립니다! 🙏

---

## 참고 자료

- [참고 자료 1](https://example.com)
- [참고 자료 2](https://example.com)
- [공식 문서](https://example.com)

---

*이 글은 [작성자 이름]이 작성했습니다. 오류나 피드백은 댓글로 남겨주세요.*`
		}
	];

	function openInEditor(content: string) {
		if (typeof window !== 'undefined') {
			try {
				localStorage.setItem('easymd_content', content);
				window.location.href = '/';
			} catch {
				window.location.href = '/';
			}
		}
	}

	function copyToClipboard(content: string, id: string) {
		if (typeof navigator !== 'undefined' && navigator.clipboard) {
			navigator.clipboard.writeText(content).then(() => {
				const btn = document.getElementById(`copy-${id}`);
				if (btn) {
					btn.textContent = '✅ 복사됨';
					setTimeout(() => { btn.textContent = '📋 복사'; }, 2000);
				}
			});
		}
	}
</script>

<svelte:head>
	<title>마크다운 템플릿 모음 — EasyMD 이지 마크다운</title>
	<meta name="description" content="바로 쓸 수 있는 마크다운 템플릿 모음. TIL, GitHub README, API 문서, 회의록, 프로젝트 기획서, 블로그 포스트 템플릿을 무료로 제공합니다." />
	<meta name="keywords" content="마크다운 템플릿, readme 템플릿, 마크다운 회의록, 블로그 포스트 템플릿, TIL 템플릿, API 문서 템플릿" />
	<meta property="og:title" content="마크다운 템플릿 모음 — EasyMD" />
	<meta property="og:description" content="바로 쓸 수 있는 마크다운 템플릿 6종. TIL부터 GitHub README까지 무료 제공." />
	<meta property="og:url" content="https://easymd.netlify.app/templates" />
	<meta property="og:type" content="article" />
</svelte:head>

<div class="templates-page">
	<div class="container">
		<a href="/" class="back-nav">← EasyMD로 돌아가기</a>

		<h1>마크다운 템플릿 모음</h1>
		<p class="tagline">바로 쓸 수 있는 마크다운 템플릿 {templates.length}종 — 복사하거나 EasyMD에서 바로 열어보세요</p>

		<div class="templates-list">
			{#each templates as tpl}
			<section class="template-card" id={tpl.id}>
				<div class="template-header">
					<div class="template-meta">
						<span class="template-emoji">{tpl.emoji}</span>
						<div>
							<h2>{tpl.title}</h2>
							<p class="template-desc">{tpl.desc}</p>
							<div class="tags">
								{#each tpl.tags as tag}
									<span class="tag">{tag}</span>
								{/each}
							</div>
						</div>
					</div>
					<div class="template-actions">
						<button
							id="copy-{tpl.id}"
							class="btn-secondary"
							onclick={() => copyToClipboard(tpl.content, tpl.id)}
						>
							📋 복사
						</button>
						<button
							class="btn-primary"
							onclick={() => openInEditor(tpl.content)}
						>
							✏️ EasyMD에서 열기
						</button>
					</div>
				</div>
				<div class="template-preview">
					<div class="preview-label">마크다운 원문</div>
					<pre class="template-code"><code>{tpl.content}</code></pre>
				</div>
			</section>
			{/each}
		</div>

		<div class="cta-box">
			<p>📝 나만의 템플릿을 EasyMD로 만들어보세요!</p>
			<a href="/" class="cta-button">EasyMD 에디터 열기</a>
		</div>

		<div class="back-link">
			<a href="/">← EasyMD로 돌아가기</a>
		</div>
	</div>
</div>

<style>
	.templates-page {
		min-height: 100vh;
		background: var(--bg-primary, #f5f5f5);
		color: var(--text-primary, #000);
		padding: 2rem 1rem;
	}

	.container {
		max-width: 960px;
		margin: 0 auto;
		background: var(--bg-secondary, #fff);
		padding: 3rem;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.back-nav {
		display: inline-block;
		color: #3498db;
		text-decoration: none;
		font-weight: 600;
		margin-bottom: 1.5rem;
		font-size: 0.95rem;
		border-bottom: 1px solid transparent;
		transition: border-color 0.2s;
	}

	.back-nav:hover {
		border-bottom-color: #3498db;
	}

	h1 {
		color: var(--text-header, #2c3e50);
		margin-bottom: 0.5rem;
		font-size: 2rem;
	}

	.tagline {
		color: var(--text-tertiary, #7f8c8d);
		font-size: 1.05rem;
		margin-bottom: 2.5rem;
		font-style: italic;
		line-height: 1.6;
	}

	.templates-list {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.template-card {
		border: 1px solid #e8e8e8;
		border-radius: 10px;
		overflow: hidden;
		transition: box-shadow 0.2s;
	}

	.template-card:hover {
		box-shadow: 0 4px 16px rgba(52, 152, 219, 0.12);
	}

	.template-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		padding: 1.5rem;
		background: var(--bg-primary, #f9f9f9);
		border-bottom: 1px solid #e8e8e8;
	}

	.template-meta {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		flex: 1;
		min-width: 0;
	}

	.template-emoji {
		font-size: 2rem;
		flex-shrink: 0;
		line-height: 1.2;
	}

	h2 {
		color: var(--text-header, #2c3e50);
		font-size: 1.25rem;
		margin: 0 0 0.4rem;
		border: none;
		padding: 0;
	}

	.template-desc {
		color: var(--text-tertiary, #666);
		font-size: 0.9rem;
		margin: 0 0 0.6rem;
		line-height: 1.6;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.tag {
		background: #eaf4fb;
		color: #2980b9;
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0.2rem 0.6rem;
		border-radius: 12px;
		border: 1px solid #bee3f8;
	}

	.template-actions {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		flex-shrink: 0;
	}

	.btn-primary,
	.btn-secondary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		padding: 0.6rem 1.1rem;
		border-radius: 6px;
		font-size: 0.85rem;
		font-weight: 600;
		cursor: pointer;
		border: none;
		white-space: nowrap;
		transition: transform 0.15s, box-shadow 0.15s;
	}

	.btn-primary {
		background: #3498db;
		color: white;
	}

	.btn-primary:hover {
		background: #2980b9;
		transform: translateY(-1px);
		box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
	}

	.btn-secondary {
		background: white;
		color: #2c3e50;
		border: 1px solid #ddd;
	}

	.btn-secondary:hover {
		border-color: #3498db;
		color: #3498db;
		transform: translateY(-1px);
	}

	.template-preview {
		background: #1e1e1e;
	}

	.preview-label {
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: #888;
		padding: 0.6rem 1.25rem 0;
	}

	.template-code {
		margin: 0;
		padding: 0.75rem 1.25rem 1.25rem;
		background: transparent;
		border: none;
		border-radius: 0;
		overflow-x: auto;
		max-height: 320px;
	}

	.template-code code {
		font-family: 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
		font-size: 0.82rem;
		color: #d4d4d4;
		white-space: pre;
		background: none;
		padding: 0;
	}

	.cta-box {
		text-align: center;
		background: linear-gradient(135deg, #3498db, #2ecc71);
		color: white;
		border-radius: 10px;
		padding: 2.5rem;
		margin: 3rem 0 2rem;
	}

	.cta-box p {
		font-size: 1.2rem;
		font-weight: 600;
		color: white;
		margin-bottom: 1rem;
	}

	.cta-button {
		display: inline-block;
		background: white;
		color: #3498db;
		font-weight: 700;
		padding: 0.85rem 2rem;
		border-radius: 30px;
		text-decoration: none;
		font-size: 1rem;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.cta-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
		text-decoration: none;
	}

	.back-link {
		margin-top: 2rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--border-color, #ddd);
	}

	.back-link a {
		color: #3498db;
		font-weight: 600;
		text-decoration: none;
	}

	.back-link a:hover {
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.container {
			padding: 1.5rem 1rem;
		}

		h1 {
			font-size: 1.6rem;
		}

		.template-header {
			flex-direction: column;
		}

		.template-actions {
			flex-direction: row;
			width: 100%;
		}

		.btn-primary,
		.btn-secondary {
			flex: 1;
		}

		.template-meta {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
