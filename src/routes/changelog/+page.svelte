<svelte:head>
	<title>업데이트 내역 — EasyMD</title>
	<meta name="description" content="EasyMD의 버전별 업데이트 내역입니다. 새로운 기능, 개선 사항, 버그 수정 내용을 확인하세요." />
	<meta property="og:title" content="업데이트 내역 — EasyMD" />
	<meta property="og:description" content="EasyMD의 버전별 업데이트 내역입니다. 새로운 기능, 개선 사항, 버그 수정 내용을 확인하세요." />
	<meta property="og:url" content="https://easymd.netlify.app/changelog" />
	<meta property="og:type" content="article" />
</svelte:head>

<div class="legal-page">
	<div class="container">
		<h1>업데이트 내역</h1>
		<p class="tagline">EasyMD의 변경 사항을 최신순으로 정리했습니다.</p>

		<section class="changelog-list">

			<div class="version-block">
				<div class="version-header">
					<span class="version-badge">v1.4.0</span>
					<span class="version-date">2026-03-25</span>
				</div>
				<ul>
					<li class="change-add">표 열 너비 드래그 조절 기능 추가</li>
					<li class="change-fix">VS Code에서 복사한 내용을 붙여넣을 때 마크다운 변환이 올바르게 동작하도록 수정</li>
				</ul>
			</div>

			<div class="version-block">
				<div class="version-header">
					<span class="version-badge">v1.3.0</span>
					<span class="version-date">2026-03-17</span>
				</div>
				<ul>
					<li class="change-add">표 메뉴 UX 개선 — 플로팅 핸들로 직관적인 행/열 조작 지원</li>
					<li class="change-fix"><code>&lt;br&gt;</code> 태그 렌더링 오류 수정</li>
					<li class="change-improve">모바일 환경에서 탭 인터페이스 반응성 개선</li>
				</ul>
			</div>

			<div class="version-block">
				<div class="version-header">
					<span class="version-badge">v1.2.0</span>
					<span class="version-date">2026-03-09</span>
				</div>
				<ul>
					<li class="change-add">Notion 스타일 WYSIWYG 에디터로 전환 (Tiptap 기반)</li>
					<li class="change-add">슬래시 명령어(<code>/</code>) 블록 삽입 메뉴 추가</li>
					<li class="change-add">BubbleMenu 텍스트 서식 도구 모음 추가 (색상, 제목 수준 등)</li>
					<li class="change-add">DOMPurify 적용으로 XSS 방어 강화</li>
					<li class="change-improve">에디터 전체 UX 개선 및 성능 최적화</li>
				</ul>
			</div>

			<div class="version-block">
				<div class="version-header">
					<span class="version-badge">v1.1.0</span>
					<span class="version-date">2025-12-01</span>
				</div>
				<ul>
					<li class="change-add">PDF 내보내기 기능 추가 (브라우저 인쇄 기반)</li>
					<li class="change-add">Word 문서(.docx) 내보내기 기능 추가</li>
					<li class="change-add">이미지 붙여넣기 지원 — 스크린샷을 바로 삽입</li>
					<li class="change-add">이미지 드래그 앤 드롭 업로드 지원</li>
					<li class="change-improve">이미지 자동 최대 1280px 압축으로 성능 개선</li>
				</ul>
			</div>

			<div class="version-block">
				<div class="version-header">
					<span class="version-badge v-initial">v1.0.0</span>
					<span class="version-date">2025-10-01</span>
				</div>
				<ul>
					<li class="change-add">🎉 EasyMD 최초 출시</li>
					<li class="change-add">마크다운 실시간 미리보기 에디터</li>
					<li class="change-add">코드 구문 강조 (Highlight.js)</li>
					<li class="change-add">마크다운 파일(.md) 다운로드</li>
					<li class="change-add">다크 모드 지원</li>
					<li class="change-add">자동 저장 (5분 주기 + Ctrl+S)</li>
				</ul>
			</div>

		</section>

		<div class="back-link">
			<a href="/">← EasyMD로 돌아가기</a>
		</div>
	</div>
</div>

<style>
	.legal-page {
		min-height: 100vh;
		background: var(--bg-primary, #f5f5f5);
		color: var(--text-primary, #000);
		padding: 2rem 1rem;
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
		background: var(--bg-secondary, #fff);
		padding: 3rem;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	h1 {
		color: var(--text-header, #2c3e50);
		margin-bottom: 0.5rem;
		font-size: 2rem;
	}

	.tagline {
		color: var(--text-tertiary, #7f8c8d);
		font-size: 1.1rem;
		margin-bottom: 2.5rem;
		font-style: italic;
	}

	.changelog-list {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.version-block {
		position: relative;
		padding-left: 1.75rem;
		padding-bottom: 2.5rem;
		border-left: 2px solid #dce8f5;
	}

	.version-block:last-child {
		border-left-color: transparent;
		padding-bottom: 0;
	}

	.version-block::before {
		content: '';
		position: absolute;
		left: -7px;
		top: 10px;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #3498db;
		border: 2px solid white;
		box-shadow: 0 0 0 2px #3498db;
	}

	.version-block:last-child::before {
		background: #95a5a6;
		box-shadow: 0 0 0 2px #95a5a6;
	}

	.version-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.version-badge {
		background: #3498db;
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-weight: 700;
		font-size: 0.9rem;
		font-family: monospace;
	}

	.version-badge.v-initial {
		background: #95a5a6;
	}

	.version-date {
		color: var(--text-tertiary, #7f8c8d);
		font-size: 0.9rem;
	}

	ul {
		margin: 0;
		padding-left: 1.25rem;
		list-style: none;
	}

	li {
		position: relative;
		padding: 0.25rem 0;
		line-height: 1.7;
		color: var(--text-secondary, #2c3e50);
		font-size: 0.95rem;
	}

	li::before {
		position: absolute;
		left: -1.25rem;
		font-weight: 700;
		font-size: 0.8rem;
	}

	li.change-add {
		padding-left: 0.25rem;
	}

	li.change-add::before {
		content: '✦';
		color: #27ae60;
	}

	li.change-fix::before {
		content: '✎';
		color: #e67e22;
	}

	li.change-improve::before {
		content: '↑';
		color: #8e44ad;
	}

	code {
		background: var(--bg-primary, #f0f0f0);
		padding: 0.1em 0.4em;
		border-radius: 3px;
		font-size: 0.88em;
		font-family: monospace;
	}

	.legend {
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
		margin-bottom: 2rem;
		font-size: 0.85rem;
		color: var(--text-tertiary, #7f8c8d);
	}

	a {
		color: #3498db;
		text-decoration: none;
		border-bottom: 1px solid transparent;
		transition: border-color 0.2s;
	}

	a:hover {
		border-bottom-color: #3498db;
	}

	.back-link {
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 1px solid var(--border-color, #ddd);
	}

	.back-link a {
		color: #3498db;
		font-weight: 600;
		font-size: 1rem;
	}

	@media (max-width: 768px) {
		.container {
			padding: 2rem 1.25rem;
		}

		h1 {
			font-size: 1.75rem;
		}

		.version-block {
			padding-left: 1.25rem;
		}
	}
</style>
