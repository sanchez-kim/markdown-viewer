<script lang="ts">
	import { page } from '$app/state';
	import { getPost, posts } from '$lib/data/posts';
	import { error } from '@sveltejs/kit';
	import { SITE_URL } from '$lib/config';

	const slug = $derived(page.params.slug);
	const post = $derived(getPost(slug));
	const otherPosts = $derived(posts.filter(p => p.slug !== slug).slice(0, 3));

	$effect(() => {
		if (!post) {
			error(404, '글을 찾을 수 없습니다.');
		}
	});

	function formatDate(dateStr: string): string {
		const d = new Date(dateStr);
		return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
	}
</script>

<svelte:head>
	<title>{post ? post.title + ' - 이지 마크다운' : '이지 마크다운'}</title>
	{#if post}
		<meta name="description" content={post.excerpt} />
		<meta property="og:title" content={post.title} />
		<meta property="og:description" content={post.excerpt} />
		<meta property="og:type" content="article" />
		<meta property="og:url" content={`${SITE_URL}/blog/${post.slug}`} />
		<meta property="og:image" content={`${SITE_URL}/og-image.png`} />
		<meta property="article:published_time" content={post.date} />
		<link rel="canonical" href={`${SITE_URL}/blog/${post.slug}`} />
		{@html `<script type="application/ld+json">${JSON.stringify({
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			"headline": post.title,
			"description": post.excerpt,
			"datePublished": post.date,
			"dateModified": post.date,
			"author": { "@type": "Person", "name": "Sanchez Kim" },
			"publisher": {
				"@type": "Organization",
				"name": "이지 마크다운 (EasyMD)",
				"logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.svg` }
			},
			"mainEntityOfPage": { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
			"image": `${SITE_URL}/og-image.png`,
			"inLanguage": "ko"
		})}<\/script>`}
	{/if}
</svelte:head>

{#if post}
<div class="post-page">
	<div class="post-hero">
		<div class="hero-inner">
			<div class="post-meta">
				<a href="/blog" class="back">← 블로그</a>
				<span class="category">{post.category}</span>
				<span class="reading-time">약 {post.readingTime}분</span>
			</div>
			<h1>{post.title}</h1>
			<p class="excerpt">{post.excerpt}</p>
			<time class="date">{formatDate(post.date)}</time>
		</div>
	</div>

	<div class="container">
		<article class="post-content">
			{@html post.content}
		</article>

		<hr class="divider" />

		<div class="cta-box">
			<p>이 글에서 다룬 문법을 바로 연습해보세요.</p>
			<a href="/" class="cta-button">이지 마크다운 에디터 열기 →</a>
		</div>

		{#if otherPosts.length > 0}
			<div class="other-posts">
				<h2>다른 글</h2>
				<div class="other-grid">
					{#each otherPosts as other}
						<a href="/blog/{other.slug}" class="other-card">
							<span class="other-category">{other.category}</span>
							<span class="other-title">{other.title}</span>
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
{/if}

<style>
	.post-page {
		min-height: 100vh;
		background: var(--bg-primary, #f5f5f5);
	}

	.post-hero {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		padding: 3rem 1rem;
	}

	.hero-inner {
		max-width: 760px;
		margin: 0 auto;
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.25rem;
		flex-wrap: wrap;
	}

	.back {
		color: rgba(255,255,255,0.85);
		text-decoration: none;
		font-size: 0.9rem;
		font-weight: 500;
	}

	.back:hover { color: white; }

	.category {
		background: rgba(255,255,255,0.2);
		padding: 2px 10px;
		border-radius: 20px;
		font-size: 12px;
		font-weight: 600;
	}

	.reading-time {
		font-size: 12px;
		opacity: 0.8;
	}

	h1 {
		font-size: 2rem;
		font-weight: 700;
		line-height: 1.35;
		margin-bottom: 0.75rem;
	}

	.excerpt {
		font-size: 1rem;
		opacity: 0.9;
		line-height: 1.65;
		margin-bottom: 1rem;
	}

	.date {
		font-size: 13px;
		opacity: 0.75;
	}

	.container {
		max-width: 760px;
		margin: 0 auto;
		padding: 3rem 1.5rem;
	}

	/* Article content */
	.post-content :global(h2) {
		font-size: 1.45rem;
		font-weight: 600;
		color: var(--text-header, #2c3e50);
		margin: 2.5rem 0 1rem;
		padding-bottom: 0.4rem;
		border-bottom: 2px solid #667eea;
	}

	.post-content :global(h3) {
		font-size: 1.15rem;
		font-weight: 600;
		color: var(--text-header, #2c3e50);
		margin: 1.75rem 0 0.6rem;
	}

	.post-content :global(p) {
		color: var(--text-secondary, #444);
		line-height: 1.8;
		margin-bottom: 1.1rem;
	}

	.post-content :global(ul),
	.post-content :global(ol) {
		color: var(--text-secondary, #444);
		line-height: 1.8;
		padding-left: 1.5rem;
		margin-bottom: 1.1rem;
	}

	.post-content :global(li) {
		margin-bottom: 0.35rem;
	}

	.post-content :global(pre) {
		background: #1e2433;
		color: #e8eaf0;
		border-radius: 8px;
		padding: 1.1rem 1.25rem;
		overflow-x: auto;
		margin: 1rem 0 1.5rem;
		font-size: 0.875rem;
		line-height: 1.65;
	}

	.post-content :global(code) {
		font-family: 'Fira Code', 'Courier New', monospace;
		font-size: 0.875em;
	}

	.post-content :global(p code),
	.post-content :global(li code) {
		background: var(--bg-quaternary, #f0f0f0);
		color: #c0392b;
		padding: 2px 5px;
		border-radius: 3px;
	}

	.post-content :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1rem 0 1.5rem;
		font-size: 0.9rem;
	}

	.post-content :global(th) {
		background: #667eea15;
		color: var(--text-header, #2c3e50);
		font-weight: 600;
		padding: 0.6rem 0.9rem;
		border: 1px solid var(--border-color, #ddd);
		text-align: left;
	}

	.post-content :global(td) {
		padding: 0.55rem 0.9rem;
		border: 1px solid var(--border-color, #ddd);
		color: var(--text-secondary, #444);
	}

	.post-content :global(tr:nth-child(even) td) {
		background: var(--bg-tertiary, #f9f9f9);
	}

	.post-content :global(strong) {
		color: var(--text-primary, #222);
	}

	/* CTA */
	.divider {
		border: none;
		border-top: 1px solid var(--border-color, #ddd);
		margin: 2.5rem 0;
	}

	.cta-box {
		background: linear-gradient(135deg, #667eea15, #764ba215);
		border: 1px solid #667eea30;
		border-radius: 10px;
		padding: 1.5rem 2rem;
		text-align: center;
		margin-bottom: 3rem;
	}

	.cta-box p {
		color: var(--text-secondary, #555);
		margin-bottom: 1rem;
	}

	.cta-button {
		display: inline-block;
		background: #667eea;
		color: white;
		padding: 0.7rem 1.6rem;
		border-radius: 6px;
		font-weight: 600;
		text-decoration: none;
		transition: background 0.15s, transform 0.15s;
	}

	.cta-button:hover {
		background: #5a6fd8;
		transform: translateY(-2px);
	}

	/* Other posts */
	.other-posts h2 {
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--text-header, #2c3e50);
		margin-bottom: 1rem;
	}

	.other-grid {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.other-card {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background: var(--bg-secondary, #fff);
		border: 1px solid var(--border-color, #e1e4e8);
		border-radius: 8px;
		padding: 0.9rem 1.1rem;
		text-decoration: none;
		transition: background 0.15s;
	}

	.other-card:hover {
		background: var(--bg-tertiary, #f5f5f5);
	}

	.other-category {
		background: #667eea20;
		color: #667eea;
		font-size: 11px;
		font-weight: 600;
		padding: 2px 8px;
		border-radius: 20px;
		white-space: nowrap;
	}

	.other-title {
		font-size: 0.9rem;
		color: var(--text-primary, #333);
		font-weight: 500;
	}

	/* Dark mode */
	:global([data-theme='dark']) .post-content :global(p code),
	:global([data-theme='dark']) .post-content :global(li code) {
		background: #21262d;
		color: #ff7b72;
	}

	:global([data-theme='dark']) .post-content :global(h2),
	:global([data-theme='dark']) .post-content :global(h3) {
		color: #e6edf3;
	}

	:global([data-theme='dark']) .post-content :global(p),
	:global([data-theme='dark']) .post-content :global(li) {
		color: #8b949e;
	}

	:global([data-theme='dark']) .post-content :global(strong) {
		color: #e6edf3;
	}

	:global([data-theme='dark']) .post-content :global(th) {
		color: #e6edf3;
		border-color: #30363d;
	}

	:global([data-theme='dark']) .post-content :global(td) {
		border-color: #30363d;
		color: #8b949e;
	}

	:global([data-theme='dark']) .post-content :global(tr:nth-child(even) td) {
		background: #161b22;
	}

	:global([data-theme='dark']) .other-card {
		background: #161b22;
		border-color: #30363d;
	}

	:global([data-theme='dark']) .other-title {
		color: #e6edf3;
	}

	:global([data-theme='dark']) .other-posts h2 {
		color: #e6edf3;
	}

	@media (max-width: 600px) {
		h1 { font-size: 1.5rem; }
		.container { padding: 2rem 1rem; }
		.cta-box { padding: 1.25rem; }
	}
</style>
