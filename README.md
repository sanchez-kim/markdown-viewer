# 📝 이지 마크다운 (EasyMD)

노션처럼 쓰는 무료 마크다운 에디터. 브라우저에서 바로, 설치 없이.

🌐 **[라이브 데모 보기](https://easymd.netlify.app/)**

[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-❤️-ff69b4?style=for-the-badge&logo=github-sponsors)](https://github.com/sponsors/sanchez-kim)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-☕-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/sanchezkim7)

## ✨ 주요 기능

### ✏️ **노션 스타일 WYSIWYG 에디터**
- 마크다운 문법을 입력하면 **즉시** 서식이 적용되는 인터랙티브 편집
- `#` → 제목, `**텍스트**` → **굵게**, `- ` → 글머리 기호 등 자동 변환
- 텍스트 선택 시 서식 도구 모음(BubbleMenu) 자동 표시
  - 굵게 / 기울임 / 밑줄 / 취소선 / 인라인 코드
  - 글자 색상 (10가지) / 배경 하이라이트 (7가지)
  - 제목 수준 (H1/H2/H3) / 글머리 기호 / 링크

### ⚡ **슬래시 명령어 (`/`)**
빈 줄에서 `/` 입력 시 블록 추가 메뉴 표시:
- 제목 1~3 / 글머리 기호 / 번호 목록
- **체크리스트** (할 일 목록)
- 코드 블록 / 인용구 / 구분선
- **표 삽입** — 행/열 수를 직접 입력 (예: `3x4`)

### 🗃️ **인터랙티브 표 편집**
표 셀 안에 커서를 두면 표 도구 모음이 자동 표시:
- 행 위/아래에 추가, 행 삭제
- 열 왼쪽/오른쪽에 추가, 열 삭제
- 표 전체 삭제

### 🖼️ **인라인 이미지 (Notion처럼)**
- **드래그 앤 드롭**: 에디터에 이미지 파일을 바로 드래그
- **클립보드 붙여넣기**: 스크린샷 등을 `Ctrl+V`로 즉시 삽입
- **파일 선택**: `🖼️ 이미지` 버튼으로 업로드
- **캔버스 압축**: 최대 1280px로 자동 리사이즈 (JPEG 85% 품질)
- **리사이즈 핸들**: 이미지 좌우 드래그로 크기 조절

### 💾 **자동 저장 및 파일 관리**
- **자동 저장**: 5분마다 LocalStorage에 자동 저장
- **수동 저장**: `💾 저장` 버튼 또는 `Ctrl+S`
- **파일명 편집**: 헤더 파일명 클릭 → 인라인 변경
- **파일 열기**: 로컬 `.md` 파일 불러오기 (`Ctrl+O`)

### 📁 **내보내기**
- **마크다운 파일** (`.md`)
- **PDF** (브라우저 인쇄 기능, 인쇄용 스타일 최적화)
- **Word 문서** (`.docx`)

### 🎨 **기타**
- **다크 모드** 지원
- **반응형 디자인** (모바일 최적화)
- **XSS 방어** (DOMPurify)
- **LocalStorage 용량 초과** 시 알림

---

## 🚀 시작하기

```bash
npm install
npm run dev       # http://localhost:3080
npm run build     # 프로덕션 빌드
npm run preview   # 빌드 미리보기
```

---

## ⌨️ 키보드 단축키

| 단축키 | 기능 |
|--------|------|
| `Ctrl+S` | 수동 저장 |
| `Ctrl+O` | 파일 열기 |
| `Ctrl+V` | 클립보드 이미지 붙여넣기 |
| `/` (빈 줄) | 슬래시 명령어 메뉴 |
| `?` | 단축키 가이드 열기/닫기 |
| `Escape` | 메뉴/모달 닫기 |

---

## 🛠️ 기술 스택

| 항목 | 라이브러리 |
|------|-----------|
| 프레임워크 | [SvelteKit 2](https://kit.svelte.dev/) |
| WYSIWYG 에디터 | [Tiptap 3](https://tiptap.dev/) |
| 마크다운 ↔ Tiptap 동기화 | [tiptap-markdown](https://github.com/aguingand/tiptap-markdown) |
| 마크다운 렌더링 | [Marked](https://marked.js.org/) |
| 구문 강조 | [Highlight.js](https://highlightjs.org/) |
| XSS 방어 | [DOMPurify](https://github.com/cure53/DOMPurify) |
| Word 내보내기 | [docx](https://docx.js.org/) |
| 호스팅 | [Netlify](https://netlify.com/) |

---

## 🔄 업데이트 히스토리

### v4.0 — Notion 완전체 (2026-03)
- **⚡ 슬래시 명령어 확장**: 체크리스트, 커스텀 크기 표 삽입
- **🗃️ 표 인터랙티브 편집**: 행/열 추가·삭제 툴바 (BubbleMenu)
- **🗑️ Source/Preview 토글 제거**: 여백 축적 버그 해결, 단일 WYSIWYG 에디터로 통합

### v3.0 — WYSIWYG & 이미지 개선 (2026-02)
- **✏️ 이미지 리사이즈 핸들**: 좌우 드래그로 크기 조절
- **🎨 BubbleMenu 확장**: 글자 색상 10종, 배경 하이라이트 7종, 밑줄, 취소선
- **🔗 Link extension**: 링크 삽입/편집 UI

### v2.5 — Notion-like WYSIWYG (2026-01)
- **Tiptap 에디터** 통합: 실시간 마크다운 변환
- **BubbleMenu**: 텍스트 선택 시 서식 도구 모음
- **슬래시 명령어**: `/` 입력으로 블록 추가
- **인라인 이미지**: drag/drop/paste + canvas 압축

### v2.1 — Base64 최적화
- Base64 이미지 자동 축약 표시, 스마트 편집 복원

### v2.0 — UX 개선
- 통합 내보내기 드롭다운, PDF/MD/DOCX 지원

---

## 📄 라이선스

오픈소스 프로젝트입니다. [LICENSE](LICENSE) 파일을 참조하세요.

---

⚡ **노션처럼 쓰고, 마크다운으로 저장하세요!**
