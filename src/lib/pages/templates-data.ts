// 마크다운 템플릿 모음. 페이지가 이 배열을 렌더한다.
//
// 영어판은 직역이 아니라 영어권 문서 관행에 맞춰 다시 썼다. 예를 들어 회의록의
// "참석자/안건/결정 사항"은 영어권에서 Attendees/Agenda/Decisions로 굳어진
// 표현을 쓰고, README의 기여 절차도 영어권 오픈소스에서 통용되는 문장으로 바꿨다.
import type { Locale } from '$lib/i18n';

export interface Template {
	id: string;
	emoji: string;
	title: string;
	desc: string;
	tags: string[];
	content: string;
}

const ko: Template[] = [
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

const en: Template[] = [
	{
		id: 'til',
		emoji: '📚',
		title: 'TIL — Today I Learned',
		desc: 'A daily learning log for developers. One entry a day, and it compounds.',
		tags: ['Dev', 'TIL', 'Learning log'],
		content: `# TIL — 2024-01-15

## Today I Learned

### Topic: [what you looked into]

#### Context
- Why this came up
- What problem you were trying to solve

#### Key takeaways
- Point 1
- Point 2
- Point 3

#### Code example

\`\`\`javascript
// Your example goes here
const example = "Hello, World!";
console.log(example);
\`\`\`

#### References
- [Official docs](https://example.com)
- [Blog post that helped](https://example.com)

#### Next steps
- [ ] Something to read up on
- [ ] Try it in a real project

---
*Written 2024-01-15 | Tags: #JavaScript #TIL*`
	},
	{
		id: 'readme',
		emoji: '📂',
		title: 'GitHub README',
		desc: 'A README for an open-source project — from installation through to contributing.',
		tags: ['GitHub', 'README', 'Open Source'],
		content: `# Project Name

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)]()

> One sentence describing what this project is and who it is for.

## ✨ Features

- ⚡ Feature one — a short description
- 🎨 Feature two — a short description
- 🔒 Feature three — a short description

## 🚀 Getting started

### Prerequisites

\`\`\`bash
node >= 18.0.0
npm >= 9.0.0
\`\`\`

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/username/project-name.git

# Move into the directory
cd project-name

# Install dependencies
npm install

# Start the dev server
npm run dev
\`\`\`

## 📖 Usage

\`\`\`javascript
import { example } from 'project-name';

const result = example({ option: 'value' });
console.log(result);
\`\`\`

## 🗂️ Project structure

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push the branch (\`git push origin feature/amazing-feature\`)
5. Open a pull request

## 📄 License

Released under the MIT License. See [LICENSE](LICENSE) for details.

## 📬 Contact

Your Name — [@username](https://twitter.com/username) — email@example.com

Project link: [https://github.com/username/project-name](https://github.com/username/project-name)`
	},
	{
		id: 'apidoc',
		emoji: '🔧',
		title: 'API reference',
		desc: 'A standard layout for REST endpoint specs and technical documentation.',
		tags: ['API', 'Technical docs', 'REST'],
		content: `# API Reference — Service API v1.0

**Base URL**: \`https://api.example.com/v1\`

**Authentication**: every request needs a bearer token.

\`\`\`
Authorization: Bearer {your-api-token}
\`\`\`

---

## Endpoints

### 1. List users

**GET** \`/users\`

Returns a paginated list of users.

#### Query parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`page\` | integer | No | Page number (default: 1) |
| \`limit\` | integer | No | Items per page (default: 20) |
| \`search\` | string | No | Search keyword |

#### Response

\`\`\`json
{
  "status": "success",
  "data": [
    { "id": 1, "name": "Alex", "email": "alex@example.com" }
  ],
  "meta": { "page": 1, "limit": 20, "total": 137 }
}
\`\`\`

---

### 2. Create a user

**POST** \`/users\`

#### Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| \`name\` | string | Yes | Display name |
| \`email\` | string | Yes | Must be unique |
| \`role\` | string | No | \`admin\` or \`member\` (default: \`member\`) |

\`\`\`json
{
  "name": "Alex",
  "email": "alex@example.com",
  "role": "member"
}
\`\`\`

---

## Error codes

| Code | Meaning | When it happens |
|------|---------|-----------------|
| \`400\` | Bad Request | A required field is missing or malformed |
| \`401\` | Unauthorized | The token is missing or invalid |
| \`404\` | Not Found | No resource with that identifier |
| \`409\` | Conflict | The email address is already in use |
| \`429\` | Too Many Requests | Rate limit exceeded |

## Rate limits

- 1,000 requests per hour per token
- Remaining quota is returned in the \`X-RateLimit-Remaining\` header`
	},
	{
		id: 'meeting',
		emoji: '📝',
		title: 'Meeting notes',
		desc: 'Structure that keeps decisions and action items from getting lost.',
		tags: ['Meetings', 'Team', 'Work'],
		content: `# [Meeting name] — 2024-01-15

**Time**: 14:00 – 15:00
**Location**: Room A / video call
**Attendees**: Alex, Sam, Jordan
**Notes by**: Alex

---

## Agenda

1. Review of last week
2. This week's priorities
3. Blockers

---

## Discussion

### 1. Review of last week
- What was completed
- What slipped, and why

### 2. This week's priorities
- Priority one — owner, target date
- Priority two — owner, target date

### 3. Blockers
- What is blocked, and what would unblock it

---

## Decisions

- **Decision 1** — what was decided and the reasoning
- **Decision 2** — what was decided and the reasoning

---

## Action items

- [ ] **Alex** — draft the spec — by Jan 19
- [ ] **Sam** — review the API design — by Jan 17
- [ ] **Jordan** — set up the staging environment — by Jan 22

---

## Next meeting

**2024-01-22 (Mon) 14:00**`
	},
	{
		id: 'project-plan',
		emoji: '🎯',
		title: 'Project plan',
		desc: 'For the start of a new project — goals, scope, schedule, and risks.',
		tags: ['Planning', 'Project', 'PM'],
		content: `# [Project name] — Project plan

**Version**: 1.0
**Date**: 2024-01-15
**Status**: Draft / In review / Approved
**Owner**: [name]

---

## Background and purpose

Why this project exists. What problem it solves, and what happens if it is not done.

## Goals

| Goal | How it is measured | Target |
|------|--------------------|--------|
| Goal one | Metric | Number |
| Goal two | Metric | Number |

## Scope

### In scope
- Item one
- Item two

### Out of scope
- Item one — and why it is excluded
- Item two — and why it is excluded

## Schedule

| Phase | Period | Deliverable |
|-------|--------|-------------|
| Discovery | Jan 15 – Jan 26 | Requirements document |
| Design | Jan 29 – Feb 9 | Design and specs |
| Build | Feb 12 – Mar 15 | Working software |
| Testing | Mar 18 – Mar 29 | Test report |
| Launch | Apr 1 | Live |

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Risk one | Medium | High | What we will do |
| Risk two | Low | Medium | What we will do |

## Open questions

- [ ] Question that still needs an answer
- [ ] Decision that has not been made yet`
	},
	{
		id: 'blog',
		emoji: '✍️',
		title: 'Blog post',
		desc: 'A structure for technical and personal blog posts that keeps the thread.',
		tags: ['Blog', 'Writing', 'Content'],
		content: `# [Title — say what the reader gets]

> One or two sentences on what this post covers and who it is for.

---

## The problem

What situation prompted this. Be concrete — a real case is worth more than an abstract description.

## What I tried first

The approach that seemed obvious, and why it did not work. This is often the most useful part for the reader.

## What worked

The approach that did work, with enough detail to reproduce.

\`\`\`javascript
// Code that shows the actual solution
const solution = doTheThing();
\`\`\`

## Why it works

The reasoning underneath. Without this the reader can copy the code but cannot adapt it.

## What to watch out for

- Edge case one
- Edge case two
- Where this approach stops being appropriate

## Summary

- Key point one
- Key point two
- Key point three

---

## References

- [Official documentation](https://example.com)
- [Related post](https://example.com)

---
*Written by [author]. Corrections and feedback welcome in the comments.*`
	}
];

export function templateList(locale: Locale): Template[] {
	return locale === 'ko' ? ko : en;
}
