<script lang="ts">
	import favicon from '$lib/assets/favicon.ico';
	import { page } from '$app/state';
	import { SITE_URL } from '$lib/config';

	let { children } = $props();

	const canonicalUrl = $derived(`${SITE_URL}${page.url.pathname}`);

	// 자체 헤더가 있는 랜딩(/)·에디터(/editor)를 제외한 모든 페이지에 통일 브랜드 헤더 표시
	const showBrandHeader = $derived(
		page.url.pathname !== '/' && page.url.pathname !== '/editor'
	);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<!-- Canonical URL -->
	<link rel="canonical" href={canonicalUrl} />

	<meta name="google-site-verification" content="5-LvgZ7FAr7MVolS-rpUAl9wzI3Cl0hUmD4vt9o2fpE" />

</svelte:head>

{#if showBrandHeader}
	<header class="site-header">
		<a href="/" class="site-brand" aria-label="이지 마크다운 홈">
			<img src="/logo.svg" alt="이지 마크다운 로고" />
			<span>이지 마크다운</span>
		</a>
		<a href="/editor" class="site-cta">에디터 열기 →</a>
	</header>
{/if}

{@render children?.()}

<style>
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
	:global(html.dark) .site-cta { color: #a9b6ff; border-color: #39406b; }
	:global(html.dark) .site-cta:hover { background: #39406b; color: #ffffff; }

	@media (max-width: 600px) {
		.site-header { padding: 0.6rem 1rem; }
		.site-brand { font-size: 0.98rem; }
	}
</style>
