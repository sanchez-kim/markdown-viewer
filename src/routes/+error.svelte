<script lang="ts">
	import { page } from '$app/state';

	const isNotFound = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{isNotFound ? '페이지를 찾을 수 없습니다' : '오류가 발생했습니다'} — EasyMD</title>
	<!-- 오류 페이지는 색인 대상이 아니다 -->
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="error-page">
	<p class="code">{page.status}</p>
	<h1>{isNotFound ? '페이지를 찾을 수 없습니다' : '오류가 발생했습니다'}</h1>
	<p class="message">
		{isNotFound
			? '주소가 바뀌었거나 삭제된 페이지일 수 있습니다.'
			: (page.error?.message ?? '잠시 후 다시 시도해 주세요.')}
	</p>

	<div class="actions">
		<a class="primary" href="/editor">에디터 열기</a>
		<a class="secondary" href="/">홈으로</a>
		<a class="secondary" href="/blog">블로그</a>
	</div>
</div>

<style>
	.error-page {
		max-width: 32rem;
		margin: 0 auto;
		padding: 5rem 1.5rem;
		text-align: center;
	}

	.code {
		margin: 0;
		font-size: 3.5rem;
		font-weight: 800;
		line-height: 1;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	h1 {
		margin: 0.75rem 0 0;
		font-size: 1.4rem;
		color: #1a1a2e;
	}

	.message {
		margin: 0.75rem 0 2rem;
		color: #56566d;
		line-height: 1.6;
	}

	.actions {
		display: flex;
		gap: 0.6rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.actions a {
		padding: 0.55rem 1.1rem;
		border-radius: 6px;
		font-weight: 600;
		font-size: 0.92rem;
		text-decoration: none;
	}

	.primary {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: #ffffff;
	}

	.secondary {
		color: #667eea;
		border: 1px solid #d9dcf0;
	}

	.secondary:hover {
		border-color: #667eea;
	}

	:global(html.dark) h1 {
		color: #e6edf3;
	}
	:global(html.dark) .message {
		color: #9aa4b2;
	}
	:global(html.dark) .secondary {
		color: #a9b6ff;
		border-color: #39406b;
	}
</style>
