<script lang="ts">
	import favicon from '$lib/assets/favicon.ico';
	import { page } from '$app/stores';

	let { children } = $props();

	const BASE_URL = 'https://easymd.netlify.app';
	$: canonicalUrl = `${BASE_URL}${$page.url.pathname}`;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<!-- Canonical URL -->
	<link rel="canonical" href={canonicalUrl} />

	<!-- Google Search Console 인증 (발급 후 content 값 입력) -->
	<!-- <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" /> -->
</svelte:head>

{@render children?.()}
