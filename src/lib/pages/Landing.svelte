<script lang="ts">
	// 랜딩 페이지 본문. 한국어(`/`)와 영어(`/en`) 라우트가 같은 마크업을 공유하고
	// 문구만 사전에서 가져온다. 마크업을 한쪽에만 고쳐 두 언어가 어긋나는 일을 막는다.
	import { SITE_URL } from '$lib/config';
	import {
		LOCALE_NAME,
		availableIn,
		dict,
		localizePath,
		type Locale
	} from '$lib/i18n';

	let { locale }: { locale: Locale } = $props();

	const t = $derived(dict(locale));
	const home = $derived(localizePath('/', locale));
	const url = $derived(`${SITE_URL}${home}`);
	const p = $derived((path: string) => localizePath(path, locale));

	// 링크는 해당 언어에 실제로 있는 페이지만 내보낸다. 영어판을 하나 추가하면
	// TRANSLATED_PATHS에 등록되는 순간 아래 목록에도 자동으로 다시 나타난다.
	const moreLinks = $derived(t.landing.moreLinks.filter((l) => availableIn(l.path, locale)));
	const footerNav = $derived(t.landing.footerLinks.filter((l) => availableIn(l.path, locale)));

	// 랜딩은 공용 헤더 대신 자체 헤더를 쓰므로 언어 전환을 여기에도 둔다.
	// 없으면 다른 언어판이 있다는 사실 자체를 알 수 없다.
	const otherLocale = $derived(locale === 'ko' ? ('en' as Locale) : ('ko' as Locale));
</script>

<svelte:head>
	<title>{t.landing.title}</title>

	<!-- SEO Meta Tags -->
	<meta name="description" content={t.landing.description} />
	<meta name="keywords" content={t.landing.keywords} />
	<meta name="author" content="Sanchez Kim" />

	<!-- Open Graph / Facebook -->
	<meta property="og:title" content={t.landing.title} />
	<meta property="og:description" content={t.landing.ogDescription} />

	<!-- Twitter — card/image는 +layout.svelte 공통값 사용 -->
	<meta name="twitter:title" content={t.landing.title} />
	<meta name="twitter:description" content={t.landing.ogDescription} />

	<!-- JSON-LD 구조화 데이터 -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: t.brand.full,
		url,
		description: t.landing.jsonLdDescription,
		applicationCategory: 'ProductivityApplication',
		operatingSystem: 'Web Browser',
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
		inLanguage: locale,
		featureList: t.landing.jsonLdFeatures
	})}<\/script>`}
</svelte:head>

<div class="landing">
	<header class="lp-header">
		<a href={home} class="lp-brand" aria-label={t.brand.homeAria}>
			<img src="/logo.svg" alt={t.brand.logoAlt} />
			<span>{t.brand.name}</span>
		</a>
		<nav class="lp-nav" aria-label={t.nav.mainMenuAria}>
			{#if availableIn('/guide', locale)}
				<a href={p('/guide')}>{t.nav.guide}</a>
			{/if}
			{#if availableIn('/blog', locale)}
				<a href={p('/blog')}>{t.nav.blog}</a>
			{/if}
			<a href={localizePath('/', otherLocale)} class="lp-nav-lang" hreflang={otherLocale}>
				{LOCALE_NAME[otherLocale]}
			</a>
			<a href={p('/editor')} class="lp-nav-cta">{t.nav.openEditor}</a>
		</nav>
	</header>

	<section class="lp-hero">
		<div class="lp-hero-inner">
			<span class="lp-badge">{t.landing.badge}</span>
			<h1 class="lp-title">{@html t.landing.heroTitle}</h1>
			<p class="lp-sub">{@html t.landing.heroSub}</p>
			<a href={p('/editor')} class="lp-cta">{t.landing.heroCta}</a>
			<ul class="lp-features">
				{#each t.landing.features as f (f.label)}
					<li><span class="lp-feature-icon">{f.icon}</span><span>{f.label}</span></li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="lp-content" aria-label={t.landing.introAria}>
		<div class="lp-content-inner">
			<h2>{t.landing.introHeading}</h2>
			<p>{t.landing.introBody}</p>

			<h3>{t.landing.whatIsHeading}</h3>
			<p>
				{t.landing.whatIsBodyBefore}<code>#</code>, <code>*</code>, <code>-</code>{t.landing
					.whatIsBodyAfter}
			</p>

			<h3>{t.landing.featuresHeading}</h3>
			<ul class="lp-list">
				{#each t.landing.featureList as f (f.term)}
					<li><strong>{f.term}</strong> — {f.desc}</li>
				{/each}
			</ul>

			<h3>{t.landing.audienceHeading}</h3>
			<ul class="lp-list">
				{#each t.landing.audienceList as a (a)}
					<li>{a}</li>
				{/each}
			</ul>

			<h3>{t.landing.moreHeading}</h3>
			<nav class="lp-links" aria-label={t.landing.moreAria}>
				{#each moreLinks as l (l.path)}
					<a href={p(l.path)}>{l.label}</a>
				{/each}
			</nav>

			<div class="lp-bottom-cta">
				<a href={p('/editor')} class="lp-cta">{t.landing.bottomCta}</a>
			</div>
		</div>
	</section>

	<footer class="lp-footer">
		<div class="lp-footer-links">
			{#each footerNav as l, i (l.path)}
				{#if i > 0}<span class="sep">|</span>{/if}
				<a href={p(l.path)}>{l.label}</a>
			{/each}
			<span class="sep">|</span>
			<a href="https://github.com/sanchez-kim/markdown-viewer" target="_blank" rel="noopener">GitHub</a>
		</div>
		<div class="lp-copyright">{t.footer.copyright}</div>
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

	.lp-nav-lang {
		border: 1px solid #dcdfe8;
		border-radius: 6px;
		padding: 0.32rem 0.7rem;
		font-size: 0.88rem !important;
	}

	.lp-nav-lang:hover {
		background: #f2f3f7;
	}

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
	:global(html.dark) .lp-nav-lang { border-color: #30363d; }
	:global(html.dark) .lp-nav-lang:hover { background: #21262d; }
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
