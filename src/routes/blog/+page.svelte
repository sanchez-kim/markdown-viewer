<script lang="ts">
	import { posts } from '$lib/data/posts';

	// 카테고리별 글 수
	const categoryCounts: [string, number][] = [...new Set(posts.map((p) => p.category))].map(
		(c) => [c, posts.filter((p) => p.category === c).length]
	);

	let selected = $state('전체');
	const filtered = $derived(
		selected === '전체' ? posts : posts.filter((p) => p.category === selected)
	);

	function formatDate(dateStr: string): string {
		const d = new Date(dateStr);
		return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
	}
</script>

<svelte:head>
	<title>블로그 - 이지 마크다운 | 마크다운 가이드 & 팁</title>
	<meta name="description" content="마크다운 기초부터 실무 활용까지. 마크다운 문법 가이드, GitHub README 작성법, 업무 문서 템플릿 등 실용적인 글을 제공합니다." />
</svelte:head>

<div class="blog-page">
	<div class="hero">
		<h1>블로그</h1>
		<p>마크다운 가이드, 실무 팁, 업무 문서 템플릿을 공유합니다.</p>
	</div>

	<div class="container">
		<div class="filter-bar">
			<button class="chip" class:active={selected === '전체'} onclick={() => (selected = '전체')}>
				전체 <span class="chip-count">{posts.length}</span>
			</button>
			{#each categoryCounts as [cat, count] (cat)}
				<button class="chip" class:active={selected === cat} onclick={() => (selected = cat)}>
					{cat} <span class="chip-count">{count}</span>
				</button>
			{/each}
		</div>

		<div class="post-grid">
			{#each filtered as post (post.slug)}
				<a href="/blog/{post.slug}" class="post-card">
					<div class="post-meta">
						<span class="category">{post.category}</span>
						<span class="reading-time">약 {post.readingTime}분</span>
					</div>
					<h2 class="post-title">{post.title}</h2>
					<p class="post-excerpt">{post.excerpt}</p>
					<div class="post-footer">
						<span class="post-date">{formatDate(post.date)}</span>
						<span class="read-more">읽기 →</span>
					</div>
				</a>
			{/each}
		</div>

		<div class="back-link">
			<a href="/editor">← 에디터로 돌아가기</a>
		</div>
	</div>
</div>

<style>
	.blog-page {
		min-height: 100vh;
		background: var(--bg-primary, #f5f5f5);
		color: var(--text-primary, #000);
	}

	.hero {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		padding: 3.5rem 1rem 3rem;
		text-align: center;
	}

	h1 {
		font-size: 2.2rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	.hero p {
		font-size: 1.05rem;
		opacity: 0.9;
	}

	.container {
		max-width: 860px;
		margin: 0 auto;
		padding: 3rem 1.5rem;
	}

	.filter-bar {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 2rem;
	}

	.chip {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		background: var(--bg-secondary, #fff);
		border: 1px solid var(--border-color, #e1e4e8);
		color: var(--text-secondary, #444);
		padding: 0.4rem 0.85rem;
		border-radius: 999px;
		font-size: 0.88rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.15s, color 0.15s, border-color 0.15s;
	}

	.chip:hover {
		border-color: #667eea;
		color: #667eea;
	}

	.chip.active {
		background: #667eea;
		border-color: #667eea;
		color: #fff;
	}

	.chip-count {
		font-size: 0.78rem;
		opacity: 0.7;
	}

	:global(html.dark) .chip {
		background: #161b22;
		border-color: #30363d;
		color: #8b949e;
	}
	:global(html.dark) .chip.active {
		background: #667eea;
		border-color: #667eea;
		color: #fff;
	}

	.post-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
		gap: 1.25rem;
		margin-bottom: 3rem;
	}

	.post-card {
		background: var(--bg-secondary, #fff);
		border: 1px solid var(--border-color, #e1e4e8);
		border-radius: 10px;
		padding: 1.5rem;
		text-decoration: none;
		color: inherit;
		display: flex;
		flex-direction: column;
		transition: box-shadow 0.2s, transform 0.2s;
	}

	.post-card:hover {
		box-shadow: 0 4px 20px rgba(0,0,0,0.1);
		transform: translateY(-3px);
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.category {
		background: #667eea20;
		color: #667eea;
		font-size: 12px;
		font-weight: 600;
		padding: 2px 10px;
		border-radius: 20px;
	}

	.reading-time {
		font-size: 12px;
		color: var(--text-tertiary, #999);
	}

	.post-title {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-header, #2c3e50);
		margin: 0 0 0.6rem;
		line-height: 1.4;
	}

	.post-excerpt {
		font-size: 0.875rem;
		color: var(--text-secondary, #666);
		line-height: 1.65;
		margin: 0 0 1rem;
		flex: 1;
	}

	.post-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 0.75rem;
		border-top: 1px solid var(--border-color, #eee);
	}

	.post-date {
		font-size: 12px;
		color: var(--text-tertiary, #999);
	}

	.read-more {
		font-size: 13px;
		font-weight: 600;
		color: #667eea;
	}

	.back-link a {
		color: #667eea;
		font-weight: 600;
		text-decoration: none;
	}

	.back-link a:hover {
		text-decoration: underline;
	}

	@media (max-width: 600px) {
		h1 { font-size: 1.8rem; }
		.post-grid { grid-template-columns: 1fr; }
		.container { padding: 2rem 1rem; }
	}

	:global([data-theme='dark']) .post-card {
		background: #161b22;
		border-color: #30363d;
	}

	:global([data-theme='dark']) .post-title {
		color: #e6edf3;
	}

	:global([data-theme='dark']) .post-excerpt {
		color: #8b949e;
	}

	:global([data-theme='dark']) .post-footer {
		border-color: #30363d;
	}
</style>
