<script lang="ts">
	// 템플릿 모음. 한국어(`/templates`)와 영어(`/en/templates`)가 마크업을 공유하고,
	// 템플릿 본문은 templates-data.ts에서 로케일에 맞는 배열을 가져온다.
	import LZString from 'lz-string';
	import { templateList } from './templates-data';
	import { localizePath, type Locale } from '$lib/i18n';

	export let locale: Locale;

	const ko = locale === 'ko';
	const p = (path: string) => localizePath(path, locale);
	const templates = templateList(locale);

	const T = ko
		? {
				back: '← EasyMD로 돌아가기',
				title: '마크다운 템플릿 모음',
				tagline: (n: number) =>
					`바로 쓸 수 있는 마크다운 템플릿 ${n}종 — 복사하거나 EasyMD에서 바로 열어보세요`,
				copy: '📋 복사',
				copied: '✅ 복사됨',
				open: '✏️ EasyMD에서 열기',
				source: '마크다운 원문',
				ctaText: '📝 나만의 템플릿을 EasyMD로 만들어보세요!',
				ctaButton: 'EasyMD 에디터 열기'
			}
		: {
				back: '← Back to EasyMD',
				title: 'Markdown templates',
				tagline: (n: number) =>
					`${n} ready-to-use Markdown templates — copy one, or open it straight in EasyMD`,
				copy: '📋 Copy',
				copied: '✅ Copied',
				open: '✏️ Open in EasyMD',
				source: 'Markdown source',
				ctaText: '📝 Build your own template in EasyMD',
				ctaButton: 'Open the EasyMD editor'
			};

	// 예전 구현은 localStorage에 'easymd_content'를 넣고 `/`(랜딩)로 보냈는데,
	// 그 키를 읽는 코드가 어디에도 없어서 버튼이 아무 일도 하지 않았다.
	// 이미 검증된 공유 링크 방식(#share=)을 그대로 재사용한다 — 에디터가
	// 마운트 시 이 해시를 읽어 문서를 만든다.
	function openInEditor(content: string) {
		if (typeof window === 'undefined') return;
		const compressed = LZString.compressToEncodedURIComponent(content);
		window.location.href = `${p('/editor')}#share=${compressed}`;
	}

	function copyToClipboard(content: string, id: string) {
		if (typeof navigator === 'undefined' || !navigator.clipboard) return;
		navigator.clipboard.writeText(content).then(() => {
			const btn = document.getElementById(`copy-${id}`);
			if (!btn) return;
			btn.textContent = T.copied;
			setTimeout(() => {
				btn.textContent = T.copy;
			}, 2000);
		});
	}
</script>

<svelte:head>
	{#if ko}
		<title>마크다운 템플릿 모음 — EasyMD 이지 마크다운</title>
		<meta name="description" content="바로 쓸 수 있는 마크다운 템플릿 모음. TIL, GitHub README, API 문서, 회의록, 프로젝트 기획서, 블로그 포스트 템플릿을 무료로 제공합니다." />
		<meta name="keywords" content="마크다운 템플릿, readme 템플릿, 마크다운 회의록, 블로그 포스트 템플릿, TIL 템플릿, API 문서 템플릿" />
		<meta property="og:title" content="마크다운 템플릿 모음 — EasyMD" />
		<meta property="og:description" content="바로 쓸 수 있는 마크다운 템플릿 6종. TIL부터 GitHub README까지 무료 제공." />
	{:else}
		<title>Markdown Templates — EasyMD</title>
		<meta name="description" content="Free, ready-to-use Markdown templates for TIL notes, GitHub READMEs, API references, meeting notes, project plans, and blog posts." />
		<meta name="keywords" content="markdown templates, readme template, meeting notes template, blog post template, TIL template, api documentation template" />
		<meta property="og:title" content="Markdown Templates — EasyMD" />
		<meta property="og:description" content="Six free Markdown templates, from TIL notes to a GitHub README." />
	{/if}
</svelte:head>

<div class="templates-page">
	<div class="container">
		<a href={p('/')} class="back-nav">{T.back}</a>

		<h1>{T.title}</h1>
		<p class="tagline">{T.tagline(templates.length)}</p>

		<div class="templates-list">
			{#each templates as tpl (tpl.id)}
			<section class="template-card" id={tpl.id}>
				<div class="template-header">
					<div class="template-meta">
						<span class="template-emoji">{tpl.emoji}</span>
						<div>
							<h2>{tpl.title}</h2>
							<p class="template-desc">{tpl.desc}</p>
							<div class="tags">
								{#each tpl.tags as tag (tag)}
									<span class="tag">{tag}</span>
								{/each}
							</div>
						</div>
					</div>
					<div class="template-actions">
						<button
							id="copy-{tpl.id}"
							class="btn-secondary"
							onclick={() => copyToClipboard(tpl.content, tpl.id)}
						>
							{T.copy}
						</button>
						<button class="btn-primary" onclick={() => openInEditor(tpl.content)}>
							{T.open}
						</button>
					</div>
				</div>
				<div class="template-preview">
					<div class="preview-label">{T.source}</div>
					<pre class="template-code"><code>{tpl.content}</code></pre>
				</div>
			</section>
			{/each}
		</div>

		<div class="cta-box">
			<p>{T.ctaText}</p>
			<a href={p('/editor')} class="cta-button">{T.ctaButton}</a>
		</div>

		<div class="back-link">
			<a href={p('/')}>{T.back}</a>
		</div>
	</div>
</div>

<style>
	.templates-page {
		min-height: 100vh;
		background: var(--bg-primary, #f5f5f5);
		color: var(--text-primary, #000);
		padding: 2rem 1rem;
	}

	.container {
		max-width: 960px;
		margin: 0 auto;
		background: var(--bg-secondary, #fff);
		padding: 3rem;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.back-nav {
		display: inline-block;
		color: #3498db;
		text-decoration: none;
		font-weight: 600;
		margin-bottom: 1.5rem;
		font-size: 0.95rem;
		border-bottom: 1px solid transparent;
		transition: border-color 0.2s;
	}

	.back-nav:hover {
		border-bottom-color: #3498db;
	}

	h1 {
		color: var(--text-header, #2c3e50);
		margin-bottom: 0.5rem;
		font-size: 2rem;
	}

	.tagline {
		color: var(--text-tertiary, #7f8c8d);
		font-size: 1.05rem;
		margin-bottom: 2.5rem;
		font-style: italic;
		line-height: 1.6;
	}

	.templates-list {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.template-card {
		border: 1px solid #e8e8e8;
		border-radius: 10px;
		overflow: hidden;
		transition: box-shadow 0.2s;
	}

	.template-card:hover {
		box-shadow: 0 4px 16px rgba(52, 152, 219, 0.12);
	}

	.template-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		padding: 1.5rem;
		background: var(--bg-primary, #f9f9f9);
		border-bottom: 1px solid #e8e8e8;
	}

	.template-meta {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		flex: 1;
		min-width: 0;
	}

	.template-emoji {
		font-size: 2rem;
		flex-shrink: 0;
		line-height: 1.2;
	}

	h2 {
		color: var(--text-header, #2c3e50);
		font-size: 1.25rem;
		margin: 0 0 0.4rem;
		border: none;
		padding: 0;
	}

	.template-desc {
		color: var(--text-tertiary, #666);
		font-size: 0.9rem;
		margin: 0 0 0.6rem;
		line-height: 1.6;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.tag {
		background: #eaf4fb;
		color: #2980b9;
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0.2rem 0.6rem;
		border-radius: 12px;
		border: 1px solid #bee3f8;
	}

	.template-actions {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		flex-shrink: 0;
	}

	.btn-primary,
	.btn-secondary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		padding: 0.6rem 1.1rem;
		border-radius: 6px;
		font-size: 0.85rem;
		font-weight: 600;
		cursor: pointer;
		border: none;
		white-space: nowrap;
		transition: transform 0.15s, box-shadow 0.15s;
	}

	.btn-primary {
		background: #3498db;
		color: white;
	}

	.btn-primary:hover {
		background: #2980b9;
		transform: translateY(-1px);
		box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
	}

	.btn-secondary {
		background: white;
		color: #2c3e50;
		border: 1px solid #ddd;
	}

	.btn-secondary:hover {
		border-color: #3498db;
		color: #3498db;
		transform: translateY(-1px);
	}

	.template-preview {
		background: #1e1e1e;
	}

	.preview-label {
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: #888;
		padding: 0.6rem 1.25rem 0;
	}

	.template-code {
		margin: 0;
		padding: 0.75rem 1.25rem 1.25rem;
		background: transparent;
		border: none;
		border-radius: 0;
		overflow-x: auto;
		max-height: 320px;
	}

	.template-code code {
		font-family: 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
		font-size: 0.82rem;
		color: #d4d4d4;
		white-space: pre;
		background: none;
		padding: 0;
	}

	.cta-box {
		text-align: center;
		background: linear-gradient(135deg, #3498db, #2ecc71);
		color: white;
		border-radius: 10px;
		padding: 2.5rem;
		margin: 3rem 0 2rem;
	}

	.cta-box p {
		font-size: 1.2rem;
		font-weight: 600;
		color: white;
		margin-bottom: 1rem;
	}

	.cta-button {
		display: inline-block;
		background: white;
		color: #3498db;
		font-weight: 700;
		padding: 0.85rem 2rem;
		border-radius: 30px;
		text-decoration: none;
		font-size: 1rem;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.cta-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
		text-decoration: none;
	}

	.back-link {
		margin-top: 2rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--border-color, #ddd);
	}

	.back-link a {
		color: #3498db;
		font-weight: 600;
		text-decoration: none;
	}

	.back-link a:hover {
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.container {
			padding: 1.5rem 1rem;
		}

		h1 {
			font-size: 1.6rem;
		}

		.template-header {
			flex-direction: column;
		}

		.template-actions {
			flex-direction: row;
			width: 100%;
		}

		.btn-primary,
		.btn-secondary {
			flex: 1;
		}

		.template-meta {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
