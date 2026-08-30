<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { SITE_URL, SITE_NAME } from '$lib/config';
	import { breadcrumbLd, footerLinks } from '$lib/seo';
	import { themeStore } from '$lib/stores/theme';
	import {
		LOCALE_NAME,
		OG_LOCALE,
		dict,
		hasTranslation,
		localeFromPath,
		localizePath,
		stripLocale,
		switchLocalePath
	} from '$lib/i18n';

	let { children } = $props();

	// 테마 적용은 레이아웃에서 한 번만 한다. 이전에는 페이지마다 각자 themeStore.init()을
	// 호출했는데 /blog, /blog/[slug], /faq, /compare, /use-cases, /changelog가 빠져 있어서
	// 저장된 테마도, 시스템 다크 모드도 그 페이지들에는 전혀 적용되지 않았다.
	onMount(() => themeStore.init());

	const locale = $derived(localeFromPath(page.url.pathname));
	const t = $derived(dict(locale));

	const breadcrumb = $derived(breadcrumbLd(page.url.pathname, locale));
	const mainLinks = $derived(footerLinks('main', locale));
	const legalLinks = $derived(footerLinks('legal', locale));

	const canonicalUrl = $derived(`${SITE_URL}${page.url.pathname}`);

	// 블로그 글만 article, 나머지는 website
	const ogType = $derived(page.url.pathname.startsWith('/blog/') ? 'article' : 'website');

	// 자체 헤더가 있는 랜딩·에디터를 제외한 모든 페이지에 통일 브랜드 헤더 표시.
	// 로케일 접두사를 뗀 경로로 비교해야 /en 과 /en/editor 도 같이 걸린다.
	const canonicalPath = $derived(stripLocale(page.url.pathname));
	const showBrandHeader = $derived(canonicalPath !== '/' && canonicalPath !== '/editor');

	// 언어판이 실제로 있는 페이지에만 hreflang을 건다. 번역하지 않은 블로그에
	// 걸면 존재하지 않는 대체 문서를 가리키게 된다.
	const alternates = $derived(
		hasTranslation(page.url.pathname)
			? [
					{ hreflang: 'ko', href: `${SITE_URL}${localizePath(canonicalPath, 'ko')}` },
					{ hreflang: 'en', href: `${SITE_URL}${localizePath(canonicalPath, 'en')}` },
					// x-default는 언어가 정해지지 않은 사용자에게 보여줄 판. 영어를 쓴다 —
					// 한국어를 모르는 방문자가 한국어판으로 떨어지는 것보다 낫다.
					{ hreflang: 'x-default', href: `${SITE_URL}${localizePath(canonicalPath, 'en')}` }
				]
			: []
	);

	const otherLocale = $derived(locale === 'ko' ? 'en' : 'ko');

	// 언어 전환 링크. 같은 페이지의 번역본이 있으면 그쪽으로, 없으면 그 언어의 홈으로 보낸다.
	// 없는 경로로 보내면 404가 되고, 전체 prerender라 빌드 자체가 실패한다(strict: true).
	const switchHref = $derived(
		hasTranslation(page.url.pathname)
			? switchLocalePath(page.url.pathname, otherLocale)
			: localizePath('/', otherLocale)
	);
</script>

<svelte:head>
	<!-- Canonical URL — 모든 페이지가 여기서 한 번만 선언한다(개별 페이지에서 중복 선언 금지) -->
	<link rel="canonical" href={canonicalUrl} />

	<meta name="google-site-verification" content="5-LvgZ7FAr7MVolS-rpUAl9wzI3Cl0hUmD4vt9o2fpE" />

	<!--
		공유 카드 공통값. 아래 태그는 여기서만 선언하고,
		개별 +page.svelte는 og:title / og:description 만 선언한다 —
		svelte:head는 중복 제거를 하지 않으므로 양쪽에 쓰면 태그가 두 번 나간다.
	-->
	<!-- 언어판 상호 참조. 양쪽이 서로를 가리켜야 검색엔진이 짝으로 인식한다. -->
	{#each alternates as alt (alt.hreflang)}
		<link rel="alternate" hreflang={alt.hreflang} href={alt.href} />
	{/each}

	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content={OG_LOCALE[locale]} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content={ogType} />
	<meta property="og:image" content={`${SITE_URL}/og-image.png`} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />

	<!-- 정적 페이지 BreadcrumbList. 블로그 글은 제목이 필요해 각 페이지가 직접 만든다. -->
	{#if breadcrumb}
		{@html `<script type="application/ld+json">${breadcrumb}<\/script>`}
	{/if}
</svelte:head>

{#if showBrandHeader}
	<header class="site-header">
		<a href={localizePath('/', locale)} class="site-brand" aria-label={t.brand.homeAria}>
			<img src="/logo.svg" alt={t.brand.logoAlt} />
			<span>{t.brand.name}</span>
		</a>
		<div class="site-header-right">
			<a href={switchHref} class="site-lang" hreflang={otherLocale} aria-label={t.nav.languageAria}>
				{LOCALE_NAME[otherLocale]}
			</a>
			<a href={localizePath('/editor', locale)} class="site-cta">{t.nav.openEditorArrow}</a>
		</div>
	</header>
{/if}

{@render children?.()}

<!--
	공용 푸터. 브랜드 헤더와 같은 조건으로만 표시한다(랜딩·에디터는 자체 푸터/전체화면).
	모든 콘텐츠 페이지가 서로 연결되므로 고아 페이지가 생기지 않는다 —
	실제로 /changelog 는 어디서도 링크되지 않는 고아 페이지였다.
-->
{#if showBrandHeader}
	<footer class="site-footer">
		<nav class="footer-links" aria-label={t.nav.siteMenuAria}>
			{#each mainLinks as l (l.path)}
				<a href={l.path}>{l.name}</a>
			{/each}
		</nav>
		<nav class="footer-links footer-legal" aria-label={t.nav.policyAria}>
			{#each legalLinks as l (l.path)}
				<a href={l.path}>{l.name}</a>
			{/each}
			<a href="https://github.com/sanchez-kim/markdown-viewer" target="_blank" rel="noopener">GitHub</a>
			<a href="mailto:help@easy-md.com">{t.footer.contact}</a>
			<a href={switchHref} hreflang={otherLocale}>{LOCALE_NAME[otherLocale]}</a>
		</nav>
		<p class="footer-copy">{t.footer.copyright}</p>
	</footer>
{/if}

<style>
	/*
		테마 CSS 변수는 레이아웃에서 정의한다. 원래 에디터(+page.svelte) 스타일 블록 안에만
		있었기 때문에, 에디터를 거치지 않는 /blog·/faq·/compare 등에서는 변수가 정의되지 않아
		var(--bg-primary, #f5f5f5) 같은 라이트 폴백만 적용됐다. 그 결과 다크 모드에서
		글자색만 어두운 테마로 바뀌고 배경은 흰색으로 남아 본문이 읽히지 않았다.
	*/
	:global(:root) {
		--bg-primary: #f5f5f5;
		--bg-secondary: #ffffff;
		--bg-tertiary: #fefefe;
		--bg-quaternary: #ecf0f1;
		--bg-header: #2c3e50;
		--text-primary: #000000;
		--text-secondary: #1f2937;
		--text-tertiary: #7f8c8d;
		--text-header: #2c3e50;
		--border-color: #ddd;
		--border-color-light: #bdc3c7;
		--code-bg: #f1f2f6;
		--code-text: #2c3e50;
		--blockquote-bg: #f8f9fa;
		--table-header-bg: #f8f9fa;
		--ad-bg: #f8f9fa;
	}

	:global(html.dark) {
		--bg-primary: #1a1a1a;
		--bg-secondary: #242424;
		--bg-tertiary: #2a2a2a;
		--bg-quaternary: #333333;
		--bg-header: #1a1a1a;
		--text-primary: #e0e0e0;
		--text-secondary: #d0d0d0;
		--text-tertiary: #a0a0a0;
		--text-header: #e0e0e0;
		--border-color: #404040;
		--border-color-light: #505050;
		--code-bg: #2a2a2a;
		--code-text: #e0e0e0;
		--blockquote-bg: #2a2a2a;
		--table-header-bg: #2a2a2a;
		--ad-bg: #242424;
	}

	:global(body) {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background-color: var(--bg-primary);
		color: var(--text-primary);
		transition: background-color 0.3s, color 0.3s;
	}

	.site-footer {
		margin-top: 3rem;
		padding: 2rem 1.5rem 2.5rem;
		border-top: 1px solid #ececf1;
		background: #fafafc;
		text-align: center;
	}

	.footer-links {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem 1.1rem;
		margin-bottom: 0.75rem;
	}

	.footer-links a {
		color: #56566d;
		text-decoration: none;
		font-size: 0.88rem;
	}

	.footer-links a:hover {
		color: #667eea;
		text-decoration: underline;
	}

	.footer-legal a {
		font-size: 0.82rem;
		color: #8a8a9e;
	}

	.footer-copy {
		margin: 0;
		font-size: 0.8rem;
		color: #9a9aae;
	}

	:global(html.dark) .site-footer {
		background: #0d1117;
		border-top-color: #21262d;
	}
	:global(html.dark) .footer-links a { color: #9aa4b2; }
	:global(html.dark) .footer-links a:hover { color: #a9b6ff; }
	:global(html.dark) .footer-legal a { color: #6e7681; }
	:global(html.dark) .footer-copy { color: #6e7681; }

	.site-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.7rem 1.5rem;
		background: #ffffff;
		border-bottom: 1px solid #ececf1;
	}

	.site-brand {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: #1a1a2e;
		text-decoration: none;
		font-weight: 700;
		font-size: 1.05rem;
	}

	/* 흰색 logo.svg를 그라데이션 배지로 감싸 흰 헤더에서도 보이게 */
	.site-brand img {
		width: 1.75rem;
		height: 1.75rem;
		padding: 4px;
		border-radius: 6px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		box-sizing: border-box;
	}

	.site-header-right {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.site-lang {
		color: #5b6376;
		text-decoration: none;
		font-weight: 600;
		font-size: 0.85rem;
		padding: 0.4rem 0.7rem;
		border-radius: 6px;
		white-space: nowrap;
		transition: background-color 0.15s, color 0.15s;
	}

	.site-lang:hover {
		background: #f2f3f7;
		color: #2f3545;
	}

	.site-cta {
		color: #667eea;
		text-decoration: none;
		font-weight: 600;
		font-size: 0.88rem;
		padding: 0.4rem 0.9rem;
		border: 1px solid #667eea;
		border-radius: 6px;
		transition: background-color 0.15s, color 0.15s;
		white-space: nowrap;
	}

	.site-cta:hover {
		background: #667eea;
		color: #ffffff;
	}

	:global(html.dark) .site-header {
		background: #0d1117;
		border-bottom-color: #21262d;
	}
	:global(html.dark) .site-brand { color: #e6edf3; }
	:global(html.dark) .site-lang { color: #8b949e; }
	:global(html.dark) .site-lang:hover { background: #21262d; color: #e6edf3; }
	:global(html.dark) .site-cta { color: #a9b6ff; border-color: #39406b; }
	:global(html.dark) .site-cta:hover { background: #39406b; color: #ffffff; }

	@media (max-width: 600px) {
		.site-header { padding: 0.6rem 1rem; }
		.site-brand { font-size: 0.98rem; }
	}
</style>
