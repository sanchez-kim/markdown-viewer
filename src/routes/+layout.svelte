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

	<meta name="google-site-verification" content="5-LvgZ7FAr7MVolS-rpUAl9wzI3Cl0hUmD4vt9o2fpE" />
</svelte:head>

{@render children?.()}
