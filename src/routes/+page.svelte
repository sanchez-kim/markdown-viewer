<script lang="ts">
	import { SITE_URL } from '$lib/config';
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme';

	// 저장된 테마(light/dark/auto)를 적용해 다크 모드 일관성 유지
	onMount(() => {
		themeStore.init();
	});

	const features = [
		{ icon: '✏️', label: '쓰는 대로 바로 보임' },
		{ icon: '💾', label: '자동 저장' },
		{ icon: '📁', label: 'MD / PDF / Word 내보내기' },
		{ icon: '🌙', label: '다크 모드' },
		{ icon: '🔒', label: '내 컴퓨터에만 저장' }
	];
</script>

<svelte:head>
	<title>이지 마크다운 - EasyMD | 무료 실시간 마크다운 에디터</title>

	<!-- SEO Meta Tags -->
	<meta name="description" content="브라우저에서 바로 사용하는 무료 마크다운 에디터. 실시간 미리보기, 자동 저장, PDF 내보내기 지원. 로그인 불필요, 개인정보 수집 없음." />
	<meta name="keywords" content="마크다운, 마크다운 에디터, markdown, markdown editor, 실시간 미리보기, 무료 에디터, 온라인 에디터, PDF 변환" />
	<meta name="author" content="Sanchez Kim" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{SITE_URL}/" />
	<meta property="og:title" content="이지 마크다운 - EasyMD | 무료 실시간 마크다운 에디터" />
	<meta property="og:description" content="브라우저에서 바로 사용하는 무료 마크다운 에디터. 실시간 미리보기, 자동 저장, PDF 내보내기 지원." />
	<meta property="og:image" content="{SITE_URL}/og-image.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="{SITE_URL}/" />
	<meta property="twitter:title" content="이지 마크다운 - EasyMD | 무료 실시간 마크다운 에디터" />
	<meta property="twitter:description" content="브라우저에서 바로 사용하는 무료 마크다운 에디터. 실시간 미리보기, 자동 저장, PDF 내보내기 지원." />
	<meta property="twitter:image" content="{SITE_URL}/og-image.png" />

	<!-- JSON-LD 구조화 데이터 -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "WebApplication",
		"name": "이지 마크다운 (EasyMD)",
		"url": SITE_URL,
		"description": "브라우저에서 바로 사용하는 무료 마크다운 에디터. 실시간 미리보기, 자동 저장, PDF 내보내기 지원. 로그인 불필요.",
		"applicationCategory": "ProductivityApplication",
		"operatingSystem": "Web Browser",
		"offers": { "@type": "Offer", "price": "0", "priceCurrency": "KRW" },
		"inLanguage": ["ko", "en"],
		"featureList": ["실시간 마크다운 미리보기", "자동 저장", "PDF 내보내기", "DOCX 내보내기", "이미지 삽입", "표 편집"]
	})}<\/script>`}
</svelte:head>

<div class="landing">
	<header class="lp-header">
		<a href="/" class="lp-brand" aria-label="이지 마크다운 홈">
			<img src="/logo.svg" alt="EasyMD 로고" />
			<span>이지 마크다운</span>
		</a>
		<nav class="lp-nav" aria-label="주요 메뉴">
			<a href="/guide">가이드</a>
			<a href="/blog">블로그</a>
			<a href="/editor" class="lp-nav-cta">에디터 열기</a>
		</nav>
	</header>

	<section class="lp-hero">
		<div class="lp-hero-inner">
			<span class="lp-badge">무료 · 설치 불필요 · 브라우저에서 바로</span>
			<h1 class="lp-title">노션처럼 쓰는<br>마크다운 에디터</h1>
			<p class="lp-sub">글을 쓰면 바로 예쁘게 보입니다.<br>저장은 자동으로, 내보내기는 MD·PDF·Word까지.</p>
			<a href="/editor" class="lp-cta">지금 바로 써보기 →</a>
			<ul class="lp-features">
				{#each features as f (f.label)}
					<li><span class="lp-feature-icon">{f.icon}</span><span>{f.label}</span></li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="lp-content" aria-label="이지 마크다운 소개">
		<div class="lp-content-inner">
			<h2>EasyMD — 브라우저에서 바로 쓰는 무료 마크다운 에디터</h2>
			<p>
				이지 마크다운(EasyMD)은 설치나 로그인 없이 웹 브라우저에서 바로 사용하는 무료 마크다운 에디터입니다.
				글을 입력하면 노션처럼 곧바로 예쁘게 정리되어 보이고, 작성한 문서는 자동으로 저장됩니다.
				완성한 글은 마크다운(.md), PDF, 워드(.docx) 파일로 내보낼 수 있어 README 작성, 회의록, 블로그 초안,
				기술 문서 등 어떤 글쓰기에도 활용할 수 있습니다. 모든 데이터는 서버로 전송되지 않고 내 브라우저에만
				저장되므로 개인정보 걱정 없이 안심하고 사용할 수 있습니다.
			</p>

			<h3>마크다운이란?</h3>
			<p>
				마크다운(Markdown)은 2004년 존 그루버가 만든 경량 마크업 언어로, HTML처럼 복잡한 태그 없이 <code>#</code>,
				<code>*</code>, <code>-</code> 같은 간단한 기호만으로 제목·목록·강조·표·코드 블록 등 서식을 표현합니다.
				작성한 텍스트가 그대로 읽히면서도 변환하면 깔끔한 문서가 되기 때문에, 오늘날 GitHub, Notion, Slack,
				Tistory, Velog, Obsidian 등 수많은 플랫폼이 마크다운을 표준 문서 형식으로 채택하고 있습니다.
			</p>

			<h3>주요 기능</h3>
			<ul class="lp-list">
				<li><strong>실시간 미리보기</strong> — 입력과 동시에 서식이 적용되어 결과를 바로 확인합니다.</li>
				<li><strong>자동 저장</strong> — 작성 중인 문서가 브라우저에 자동으로 보관되어 새로고침해도 사라지지 않습니다.</li>
				<li><strong>다양한 내보내기</strong> — 마크다운, PDF, 워드(DOCX) 형식으로 한 번에 변환·다운로드합니다.</li>
				<li><strong>표·체크리스트·코드 강조</strong> — 표 편집, 할 일 목록, 200여 개 언어의 코드 문법 강조를 지원합니다.</li>
				<li><strong>다크 모드</strong> — 눈이 편한 어두운 테마로 장시간 작업에도 부담이 적습니다.</li>
				<li><strong>개인정보 보호</strong> — 로그인이 필요 없고, 문서는 서버가 아닌 내 컴퓨터에만 저장됩니다.</li>
			</ul>

			<h3>이런 분께 추천합니다</h3>
			<ul class="lp-list">
				<li>GitHub README나 오픈소스 문서를 깔끔하게 작성하려는 개발자</li>
				<li>회의록·업무 문서·기획서를 빠르게 정리하려는 직장인</li>
				<li>Tistory·Velog·브런치에 올릴 블로그 글 초안을 잡는 작가·블로거</li>
				<li>강의 노트나 과제를 구조적으로 정리하려는 학생</li>
			</ul>

			<h3>더 알아보기</h3>
			<nav class="lp-links" aria-label="콘텐츠 둘러보기">
				<a href="/guide">마크다운 문법 가이드</a>
				<a href="/templates">마크다운 템플릿 모음</a>
				<a href="/use-cases">활용 사례</a>
				<a href="/compare">에디터 비교 (노션·Typora·Obsidian)</a>
				<a href="/shortcuts">단축키 모음</a>
				<a href="/blog">마크다운 블로그</a>
				<a href="/faq">자주 묻는 질문</a>
			</nav>

			<div class="lp-bottom-cta">
				<a href="/editor" class="lp-cta">에디터 열고 바로 시작하기 →</a>
			</div>
		</div>
	</section>

	<footer class="lp-footer">
		<div class="lp-footer-links">
			<a href="/about">소개</a>
			<span class="sep">|</span>
			<a href="/guide">가이드</a>
			<span class="sep">|</span>
			<a href="/blog">블로그</a>
			<span class="sep">|</span>
			<a href="/privacy">개인정보처리방침</a>
			<span class="sep">|</span>
			<a href="/terms">이용약관</a>
			<span class="sep">|</span>
			<a href="https://github.com/sanchez-kim/markdown-viewer" target="_blank" rel="noopener">GitHub</a>
		</div>
		<div class="lp-copyright">© 2026 이지 마크다운 (EasyMD)</div>
	</footer>
</div>

<style>
	.landing {
		min-height: 100vh;
		background: #ffffff;
		color: #1a1a2e;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	/* ===== Header ===== */
	.lp-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.5rem;
		max-width: 1080px;
		margin: 0 auto;
	}

	.lp-brand {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 700;
		font-size: 1.15rem;
		color: #1a1a2e;
		text-decoration: none;
	}

	/* 로고 SVG가 흰색이라 흰 배경에선 안 보임 → 그라데이션 배지로 감싸 어디서든 보이게 */
	.lp-brand img {
		width: 1.9rem;
		height: 1.9rem;
		padding: 4px;
		border-radius: 7px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		box-sizing: border-box;
	}

	.lp-nav {
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}

	.lp-nav a {
		color: #444;
		text-decoration: none;
		font-size: 0.95rem;
		font-weight: 500;
	}

	.lp-nav a:hover { color: #667eea; }

	.lp-nav-cta {
		background: #667eea;
		color: #fff !important;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		font-weight: 600;
	}

	.lp-nav-cta:hover { background: #5a6fd8; }

	/* ===== Hero ===== */
	.lp-hero {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: #fff;
		text-align: center;
		padding: 5rem 1.5rem 4.5rem;
	}

	.lp-hero-inner { max-width: 720px; margin: 0 auto; }

	.lp-badge {
		display: inline-block;
		background: rgba(255, 255, 255, 0.18);
		border: 1px solid rgba(255, 255, 255, 0.25);
		font-size: 0.82rem;
		font-weight: 600;
		padding: 0.35rem 0.9rem;
		border-radius: 999px;
		margin-bottom: 1.5rem;
	}

	.lp-title {
		font-size: 2.8rem;
		font-weight: 800;
		line-height: 1.2;
		letter-spacing: -0.02em;
		margin: 0 0 1.25rem;
	}

	.lp-sub {
		font-size: 1.15rem;
		line-height: 1.6;
		opacity: 0.95;
		margin: 0 0 2rem;
	}

	.lp-cta {
		display: inline-block;
		background: #fff;
		color: #5a4a9f;
		font-weight: 700;
		font-size: 1.05rem;
		padding: 0.9rem 2rem;
		border-radius: 8px;
		text-decoration: none;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
		transition: transform 0.15s, box-shadow 0.15s;
	}

	.lp-cta:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 28px rgba(0, 0, 0, 0.24);
	}

	.lp-features {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem 1.5rem;
		list-style: none;
		padding: 0;
		margin: 2.75rem 0 0;
	}

	.lp-features li {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.92rem;
		opacity: 0.95;
	}

	.lp-feature-icon { font-size: 1.05rem; }

	/* ===== Content (SEO 본문) ===== */
	.lp-content {
		padding: 4rem 1.5rem;
	}

	.lp-content-inner {
		max-width: 760px;
		margin: 0 auto;
	}

	.lp-content h2 {
		font-size: 1.7rem;
		font-weight: 700;
		color: #1a1a2e;
		margin: 0 0 1.25rem;
		line-height: 1.35;
	}

	.lp-content h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: #2c3e50;
		margin: 2.5rem 0 0.85rem;
	}

	.lp-content p {
		color: #444;
		line-height: 1.85;
		margin: 0 0 1.1rem;
	}

	.lp-content code {
		background: #f0f0f5;
		color: #c0392b;
		padding: 0.1em 0.4em;
		border-radius: 3px;
		font-size: 0.9em;
	}

	.lp-list {
		color: #444;
		line-height: 1.8;
		padding-left: 1.4rem;
		margin: 0 0 1.1rem;
	}

	.lp-list li { margin-bottom: 0.5rem; }

	.lp-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
		margin-top: 0.5rem;
	}

	.lp-links a {
		background: #eef1fb;
		color: #4a5bbf;
		padding: 0.5rem 0.95rem;
		border-radius: 999px;
		font-size: 0.9rem;
		font-weight: 500;
		text-decoration: none;
		transition: background 0.15s;
	}

	.lp-links a:hover { background: #dfe4f8; }

	.lp-bottom-cta {
		text-align: center;
		margin-top: 3rem;
	}

	.lp-bottom-cta .lp-cta {
		background: #667eea;
		color: #fff;
		box-shadow: 0 6px 20px rgba(102, 126, 234, 0.35);
	}

	.lp-bottom-cta .lp-cta:hover { background: #5a6fd8; }

	/* ===== Footer ===== */
	.lp-footer {
		border-top: 1px solid #eaeaf0;
		padding: 2rem 1.5rem;
		text-align: center;
	}

	.lp-footer-links {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
		font-size: 0.9rem;
		margin-bottom: 0.75rem;
	}

	.lp-footer-links a {
		color: #555;
		text-decoration: none;
	}

	.lp-footer-links a:hover { color: #667eea; }

	.lp-footer-links .sep { color: #ccc; }

	.lp-copyright {
		font-size: 0.85rem;
		color: #999;
	}

	/* ===== Dark mode ===== */
	:global(html.dark) .landing {
		background: #0d1117;
		color: #e6edf3;
	}

	:global(html.dark) .lp-brand { color: #e6edf3; }
	:global(html.dark) .lp-nav a { color: #8b949e; }
	:global(html.dark) .lp-nav a:hover { color: #a9b6ff; }
	:global(html.dark) .lp-content h2 { color: #e6edf3; }
	:global(html.dark) .lp-content h3 { color: #c9d1d9; }
	:global(html.dark) .lp-content p,
	:global(html.dark) .lp-list { color: #8b949e; }
	:global(html.dark) .lp-content code { background: #21262d; color: #ff7b72; }
	:global(html.dark) .lp-links a { background: #1c2333; color: #a9b6ff; }
	:global(html.dark) .lp-links a:hover { background: #262e42; }
	:global(html.dark) .lp-footer { border-top-color: #21262d; }
	:global(html.dark) .lp-footer-links a { color: #8b949e; }
	:global(html.dark) .lp-footer-links .sep { color: #30363d; }
	:global(html.dark) .lp-copyright { color: #6e7681; }

	/* ===== Responsive ===== */
	@media (max-width: 600px) {
		.lp-title { font-size: 2.1rem; }
		.lp-sub { font-size: 1.05rem; }
		.lp-hero { padding: 3.5rem 1.25rem 3.5rem; }
		.lp-nav { gap: 0.85rem; }
		.lp-nav a:not(.lp-nav-cta) { display: none; }
		.lp-content { padding: 3rem 1.25rem; }
		.lp-content h2 { font-size: 1.45rem; }
	}
</style>
