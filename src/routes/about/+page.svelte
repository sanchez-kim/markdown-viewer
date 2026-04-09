<script lang="ts">
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme';

	onMount(() => {
		document.title = '소개 - 이지 마크다운';
		themeStore.init();
	});
</script>

<svelte:head>
	<title>소개 - 이지 마크다운 (EasyMD)</title>
	<meta name="description" content="이지 마크다운은 브라우저에서 바로 사용할 수 있는 무료 마크다운 에디터입니다. 개인정보 수집 없이 안전하게 사용하세요." />
</svelte:head>

<div class="about-page">
	<div class="hero">
		<h1>이지 마크다운 <span class="brand">EasyMD</span></h1>
		<p class="tagline">노션처럼 쓰고, 마크다운으로 저장하는 무료 웹 에디터</p>
		<div class="cta-row">
			<a href="/" class="btn-primary">에디터 열기 →</a>
			<a href="https://github.com/sanchez-kim/markdown-viewer" target="_blank" rel="noopener" class="btn-secondary">GitHub</a>
		</div>
	</div>

	<div class="container">

		<!-- Features -->
		<section>
			<h2 class="section-title">핵심 기능</h2>
			<div class="card-grid">
				<div class="card">
					<div class="card-icon">✏️</div>
					<h3>WYSIWYG 편집</h3>
					<p>마크다운 문법을 입력하면 즉시 서식이 적용됩니다. <code>#</code> 제목, <code>**굵게**</code>, <code>-</code> 목록이 자동 변환됩니다.</p>
				</div>
				<div class="card">
					<div class="card-icon">🔧</div>
					<h3>서식 도구 모음</h3>
					<p>텍스트를 선택하면 도구 모음이 나타납니다. 굵게·기울임·밑줄·색상·하이라이트·링크를 즉시 적용할 수 있습니다.</p>
				</div>
				<div class="card">
					<div class="card-icon">⚡</div>
					<h3>슬래시 명령어</h3>
					<p>빈 줄에서 <code>/</code>를 입력하면 블록 메뉴가 표시됩니다. 키보드 ↑↓ 탐색, Enter로 실행할 수 있습니다.</p>
				</div>
				<div class="card">
					<div class="card-icon">🗃️</div>
					<h3>인터랙티브 표</h3>
					<p>표 안에 커서를 두면 도구 모음이 자동 표시됩니다. 행·열 추가/삭제, 드래그로 열 너비를 조절할 수 있습니다.</p>
				</div>
				<div class="card">
					<div class="card-icon">🖼️</div>
					<h3>인라인 이미지</h3>
					<p>드래그 앤 드롭 또는 <code>Ctrl+V</code>로 스크린샷을 붙여넣을 수 있습니다. 자동 압축 (최대 1280px), 드래그로 크기 조절.</p>
				</div>
				<div class="card new">
					<div class="badge">NEW</div>
					<div class="card-icon">📋</div>
					<h3>다중 문서 관리</h3>
					<p>여러 문서를 저장하고 전환할 수 있습니다. 모든 문서는 브라우저에만 저장되며, 제목·수정 시각·미리보기를 한눈에 확인할 수 있습니다.</p>
				</div>
				<div class="card new">
					<div class="badge">NEW</div>
					<div class="card-icon">🕐</div>
					<h3>버전 이력</h3>
					<p>저장할 때마다 최대 20개의 스냅샷이 자동으로 기록됩니다. 이력 탭에서 클릭 한 번으로 이전 버전을 복원할 수 있습니다.</p>
				</div>
				<div class="card new">
					<div class="badge">NEW</div>
					<div class="card-icon">🔗</div>
					<h3>공유 링크</h3>
					<p>내보내기 메뉴에서 "공유 링크 복사"를 클릭하면 문서 내용이 압축된 URL이 생성됩니다. 백엔드 없이 링크 하나로 공유할 수 있습니다.</p>
				</div>
				<div class="card">
					<div class="card-icon">💾</div>
					<h3>자동 저장 &amp; 내보내기</h3>
					<p>5분마다 자동 저장, <code>Ctrl+S</code>로 수동 저장. 마크다운 (<code>.md</code>), PDF, Word (<code>.docx</code>) 형식으로 내보낼 수 있습니다.</p>
				</div>
				<div class="card">
					<div class="card-icon">🎨</div>
					<h3>다크 모드</h3>
					<p>라이트·다크·시스템 설정을 지원합니다. 눈이 편한 다크 모드로 장시간 작업해도 피로감이 적습니다.</p>
				</div>
			</div>
		</section>

		<!-- Privacy highlight -->
		<section class="privacy-section">
			<div class="privacy-box">
				<h2>🔒 개인정보 완전 보호</h2>
				<div class="privacy-grid">
					<div class="privacy-item">
						<span class="check">✓</span>
						<div>
							<strong>로그인 불필요</strong>
							<p>회원가입 없이 바로 사용</p>
						</div>
					</div>
					<div class="privacy-item">
						<span class="check">✓</span>
						<div>
							<strong>서버 전송 없음</strong>
							<p>모든 데이터는 브라우저에만 저장</p>
						</div>
					</div>
					<div class="privacy-item">
						<span class="check">✓</span>
						<div>
							<strong>개인정보 수집 없음</strong>
							<p>이메일·이름 등 어떠한 정보도 수집 안 함</p>
						</div>
					</div>
					<div class="privacy-item">
						<span class="check">✓</span>
						<div>
							<strong>쿠키 없는 분석</strong>
							<p>Cloudflare Analytics로 익명 통계만 수집</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Who is it for -->
		<section>
			<h2 class="section-title">이런 분께 딱 맞습니다</h2>
			<div class="audience-grid">
				<div class="audience-item">📝 <strong>블로거</strong> — 마크다운으로 글을 작성하는 분</div>
				<div class="audience-item">👨‍💻 <strong>개발자</strong> — README, 기술 문서를 작성하는 개발자</div>
				<div class="audience-item">📚 <strong>학생</strong> — 노트 정리, 리포트 작성이 필요한 학생</div>
				<div class="audience-item">✍️ <strong>작가</strong> — 간단한 문서 작성이 필요한 모든 분</div>
			</div>
		</section>

		<!-- Tech stack -->
		<section>
			<h2 class="section-title">기술 스택</h2>
			<div class="tech-list">
				<span class="tech-badge">SvelteKit 2</span>
				<span class="tech-badge">Tiptap 3</span>
				<span class="tech-badge">TypeScript</span>
				<span class="tech-badge">Marked.js</span>
				<span class="tech-badge">Highlight.js</span>
				<span class="tech-badge">DOMPurify</span>
				<span class="tech-badge">lz-string</span>
				<span class="tech-badge">Netlify</span>
			</div>
		</section>

		<!-- Sponsor -->
		<section class="sponsor-section">
			<h2 class="section-title">💖 프로젝트 후원</h2>
			<p>이지 마크다운은 무료로 제공되는 오픈소스 프로젝트입니다. 도움이 되셨다면 후원을 고려해주세요!</p>
			<div class="sponsor-links">
				<a href="https://github.com/sponsors/sanchez-kim" target="_blank" rel="noopener" class="sponsor-button github">
					GitHub Sponsors
				</a>
				<a href="https://buymeacoffee.com/sanchezkim7" target="_blank" rel="noopener" class="sponsor-button coffee">
					☕ Buy Me a Coffee
				</a>
			</div>
		</section>

		<!-- Contact -->
		<section>
			<h2 class="section-title">📬 문의</h2>
			<p>버그 제보, 기능 제안, 문의사항은 GitHub Issues로 남겨주세요.</p>
			<div class="contact-links">
				<a href="https://github.com/sanchez-kim/markdown-viewer" target="_blank" rel="noopener">GitHub 저장소</a>
				<a href="https://github.com/sanchez-kim/markdown-viewer/issues" target="_blank" rel="noopener">버그 제보 / 기능 제안</a>
			</div>
		</section>

		<div class="back-link">
			<a href="/">← 에디터로 돌아가기</a>
		</div>
	</div>
</div>

<style>
	.about-page {
		min-height: 100vh;
		background: var(--bg-primary, #f5f5f5);
		color: var(--text-primary, #000);
	}

	/* Hero */
	.hero {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		padding: 4rem 1rem 3rem;
		text-align: center;
	}

	h1 {
		font-size: 2.4rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	.brand {
		opacity: 0.85;
		font-weight: 400;
		font-size: 1.6rem;
	}

	.tagline {
		font-size: 1.15rem;
		opacity: 0.9;
		margin-bottom: 2rem;
	}

	.cta-row {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn-primary {
		background: white;
		color: #667eea;
		padding: 0.7rem 1.6rem;
		border-radius: 6px;
		font-weight: 600;
		text-decoration: none;
		transition: transform 0.15s, box-shadow 0.15s;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0,0,0,0.2);
	}

	.btn-secondary {
		background: rgba(255,255,255,0.15);
		color: white;
		border: 1px solid rgba(255,255,255,0.5);
		padding: 0.7rem 1.6rem;
		border-radius: 6px;
		font-weight: 600;
		text-decoration: none;
		transition: background 0.15s;
	}

	.btn-secondary:hover {
		background: rgba(255,255,255,0.25);
	}

	/* Container */
	.container {
		max-width: 900px;
		margin: 0 auto;
		padding: 3rem 1.5rem;
	}

	section {
		margin-bottom: 3.5rem;
	}

	.section-title {
		font-size: 1.4rem;
		font-weight: 600;
		color: var(--text-header, #2c3e50);
		margin-bottom: 1.5rem;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid #667eea;
	}

	/* Feature cards */
	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 1rem;
	}

	.card {
		position: relative;
		background: var(--bg-secondary, #fff);
		border: 1px solid var(--border-color, #e1e4e8);
		border-radius: 10px;
		padding: 1.25rem;
		transition: box-shadow 0.2s, transform 0.2s;
	}

	.card:hover {
		box-shadow: 0 4px 16px rgba(0,0,0,0.08);
		transform: translateY(-2px);
	}

	.card.new {
		border-color: #667eea;
	}

	.badge {
		position: absolute;
		top: 10px;
		right: 10px;
		background: #667eea;
		color: white;
		font-size: 10px;
		font-weight: 700;
		padding: 2px 7px;
		border-radius: 20px;
		letter-spacing: 0.5px;
	}

	.card-icon {
		font-size: 1.8rem;
		margin-bottom: 0.6rem;
	}

	.card h3 {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-header, #2c3e50);
		margin: 0 0 0.4rem;
	}

	.card p {
		font-size: 0.875rem;
		color: var(--text-secondary, #555);
		line-height: 1.6;
		margin: 0;
	}

	code {
		font-size: 0.82em;
		background: var(--bg-quaternary, #f0f0f0);
		padding: 1px 4px;
		border-radius: 3px;
		font-family: monospace;
	}

	/* Privacy box */
	.privacy-box {
		background: linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%);
		border: 1px solid #b2dfdb;
		border-radius: 12px;
		padding: 2rem;
	}

	.privacy-box h2 {
		font-size: 1.3rem;
		font-weight: 600;
		color: #1b5e20;
		margin-bottom: 1.5rem;
	}

	.privacy-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
	}

	.privacy-item {
		display: flex;
		gap: 0.75rem;
		align-items: flex-start;
	}

	.check {
		color: #2e7d32;
		font-size: 1.2rem;
		font-weight: 700;
		flex-shrink: 0;
		margin-top: 1px;
	}

	.privacy-item strong {
		display: block;
		font-size: 0.9rem;
		color: #1b5e20;
		margin-bottom: 2px;
	}

	.privacy-item p {
		font-size: 0.82rem;
		color: #388e3c;
		margin: 0;
		line-height: 1.4;
	}

	/* Dark mode adjustments for privacy box */
	:global([data-theme='dark']) .privacy-box {
		background: linear-gradient(135deg, #1a2e1a 0%, #1a2a3a 100%);
		border-color: #2d4a2d;
	}

	:global([data-theme='dark']) .privacy-box h2 {
		color: #81c784;
	}

	:global([data-theme='dark']) .privacy-item strong {
		color: #a5d6a7;
	}

	:global([data-theme='dark']) .privacy-item p {
		color: #66bb6a;
	}

	:global([data-theme='dark']) .check {
		color: #66bb6a;
	}

	/* Audience */
	.audience-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 0.75rem;
	}

	.audience-item {
		background: var(--bg-secondary, #fff);
		border: 1px solid var(--border-color, #e1e4e8);
		border-radius: 8px;
		padding: 0.9rem 1.1rem;
		font-size: 0.9rem;
		color: var(--text-secondary, #444);
		line-height: 1.5;
	}

	/* Tech stack */
	.tech-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tech-badge {
		background: var(--bg-secondary, #fff);
		border: 1px solid var(--border-color, #e1e4e8);
		color: var(--text-secondary, #555);
		padding: 0.35rem 0.85rem;
		border-radius: 20px;
		font-size: 0.875rem;
		font-weight: 500;
	}

	/* Sponsor */
	.sponsor-section p {
		color: var(--text-secondary, #555);
		margin-bottom: 1.25rem;
		line-height: 1.7;
	}

	.sponsor-links {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.sponsor-button {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		border-radius: 6px;
		font-weight: 600;
		text-decoration: none;
		transition: transform 0.15s, box-shadow 0.15s;
	}

	.sponsor-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0,0,0,0.15);
	}

	.sponsor-button.github {
		background: #6e5494;
		color: white;
	}

	.sponsor-button.coffee {
		background: #FFDD00;
		color: #000;
	}

	/* Contact */
	.contact-links {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		margin-top: 0.5rem;
	}

	.contact-links a,
	section a {
		color: #667eea;
		text-decoration: none;
		font-weight: 500;
		border-bottom: 1px solid transparent;
		transition: border-color 0.15s;
	}

	.contact-links a:hover,
	section a:hover {
		border-bottom-color: #667eea;
	}

	section p {
		color: var(--text-secondary, #555);
		line-height: 1.7;
	}

	/* Back link */
	.back-link {
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 1px solid var(--border-color, #ddd);
	}

	.back-link a {
		color: #667eea;
		font-weight: 600;
		text-decoration: none;
	}

	.back-link a:hover {
		text-decoration: underline;
	}

	/* Dark mode */
	:global([data-theme='dark']) .card {
		background: #161b22;
		border-color: #30363d;
	}

	:global([data-theme='dark']) .card.new {
		border-color: #667eea;
	}

	:global([data-theme='dark']) .card h3 {
		color: #e6edf3;
	}

	:global([data-theme='dark']) .card p {
		color: #8b949e;
	}

	:global([data-theme='dark']) code {
		background: #21262d;
		color: #e6edf3;
	}

	:global([data-theme='dark']) .audience-item {
		background: #161b22;
		border-color: #30363d;
		color: #8b949e;
	}

	:global([data-theme='dark']) .tech-badge {
		background: #161b22;
		border-color: #30363d;
		color: #8b949e;
	}

	:global([data-theme='dark']) .section-title {
		color: #e6edf3;
	}

	/* Responsive */
	@media (max-width: 600px) {
		h1 { font-size: 1.8rem; }
		.brand { font-size: 1.2rem; }
		.tagline { font-size: 1rem; }
		.card-grid { grid-template-columns: 1fr; }
		.privacy-grid { grid-template-columns: 1fr; }
		.audience-grid { grid-template-columns: 1fr; }
		.container { padding: 2rem 1rem; }
	}
</style>
