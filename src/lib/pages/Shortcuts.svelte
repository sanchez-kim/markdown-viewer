<script lang="ts">
	// 단축키 페이지. 한국어(`/shortcuts`)와 영어(`/en/shortcuts`)가 마크업을 공유하고,
	// 항목은 shortcuts-data.ts에서 로케일에 맞는 배열을 가져온다.
	import { shortcutGroups } from './shortcuts-data';
	import { localizePath, type Locale } from '$lib/i18n';

	export let locale: Locale;

	const p = (path: string) => localizePath(path, locale);
	const groups = shortcutGroups(locale);
	const ko = locale === 'ko';
</script>

<svelte:head>
	{#if ko}
		<title>단축키 모음 — EasyMD</title>
		<meta name="description" content="EasyMD 마크다운 에디터의 키보드 단축키 전체 목록입니다. 서식·블록·파일·편집기 단축키를 Mac과 Windows 기준으로 정리했습니다." />
		<meta property="og:title" content="단축키 모음 — EasyMD" />
		<meta property="og:description" content="EasyMD 마크다운 에디터의 키보드 단축키 전체 목록. Mac / Windows 병기." />
	{:else}
		<title>Keyboard Shortcuts — EasyMD</title>
		<meta name="description" content="The full list of keyboard shortcuts in the EasyMD Markdown editor — formatting, blocks, files, and editing, for both Mac and Windows." />
		<meta property="og:title" content="Keyboard Shortcuts — EasyMD" />
		<meta property="og:description" content="The full list of keyboard shortcuts in the EasyMD Markdown editor, for both Mac and Windows." />
	{/if}
</svelte:head>

<div class="shortcuts-page">
	<div class="container">
		<a href={p('/')} class="back-nav">{ko ? '← EasyMD로 돌아가기' : '← Back to EasyMD'}</a>

		<h1>{ko ? '단축키 모음' : 'Keyboard shortcuts'}</h1>
		<p class="tagline">
			{ko
				? 'EasyMD의 모든 키보드 단축키 — Mac / Windows 병기'
				: 'Every shortcut in EasyMD — shown for both Mac and Windows'}
		</p>

		<div class="os-badge-row">
			<span class="os-badge mac">⌘ Mac: Command (Cmd)</span>
			<span class="os-badge win">Ctrl Windows / Linux: Ctrl</span>
		</div>

		{#each groups as group (group.title)}
		<section>
			<h2>{group.icon} {group.title}</h2>
			<div class="shortcut-grid">
				{#each group.items as item (item.label)}
				<div class="shortcut-card">
					<div class="keys">
						{#each item.keys as key, i (i)}
							<kbd>{key}</kbd>{#if i < item.keys.length - 1}<span class="plus">+</span>{/if}
						{/each}
					</div>
					<div class="shortcut-info">
						<span class="shortcut-label">{item.label}</span>
						{#if item.desc}
							<span class="shortcut-desc">{item.desc}</span>
						{/if}
					</div>
				</div>
				{/each}
			</div>
		</section>
		{/each}

		<div class="tip-box">
			<h3>{ko ? '💡 팁' : '💡 Tips'}</h3>
			{#if ko}
				<ul>
					<li><strong>Mac</strong>에서는 <code>Ctrl</code> 대신 <code>⌘ Command</code>를 사용합니다.</li>
					<li>슬래시 메뉴(<code>/</code>)는 <strong>빈 줄의 맨 앞</strong>에서 입력해야 활성화됩니다.</li>
					<li>텍스트를 선택하면 <strong>BubbleMenu</strong>가 자동으로 나타납니다.</li>
					<li>이미지는 <code>Ctrl/⌘+V</code>로 클립보드에서 바로 붙여넣을 수 있습니다.</li>
				</ul>
			{:else}
				<ul>
					<li>On <strong>Mac</strong>, use <code>⌘ Command</code> wherever <code>Ctrl</code> is shown.</li>
					<li>The slash menu (<code>/</code>) only opens at the <strong>start of an empty line</strong>.</li>
					<li>Selecting text brings up the <strong>formatting toolbar</strong> automatically.</li>
					<li>Images can be pasted straight from the clipboard with <code>Ctrl/⌘+V</code>.</li>
				</ul>
			{/if}
		</div>

		<div class="cta-box">
			<p>{ko ? '⌨️ 단축키를 직접 사용해보세요!' : '⌨️ Try them out for yourself'}</p>
			<a href={p('/editor')} class="cta-button">{ko ? 'EasyMD 에디터 열기' : 'Open the EasyMD editor'}</a>
		</div>

		<div class="back-link">
			<a href={p('/')}>{ko ? '← EasyMD로 돌아가기' : '← Back to EasyMD'}</a>
		</div>
	</div>
</div>

<style>
	.shortcuts-page {
		min-height: 100vh;
		background: var(--bg-primary, #f5f5f5);
		color: var(--text-primary, #000);
		padding: 2rem 1rem;
	}

	.container {
		max-width: 900px;
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
		margin-bottom: 1.5rem;
		font-style: italic;
	}

	.os-badge-row {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		margin-bottom: 2.5rem;
	}

	.os-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.35rem 0.85rem;
		border-radius: 20px;
		font-size: 0.82rem;
		font-weight: 600;
	}

	.os-badge.mac {
		background: #f0f4ff;
		color: #2c5282;
		border: 1px solid #bee3f8;
	}

	.os-badge.win {
		background: #f0fff4;
		color: #276749;
		border: 1px solid #9ae6b4;
	}

	section {
		margin-bottom: 2.5rem;
	}

	h2 {
		color: var(--text-header, #2c3e50);
		margin-top: 0;
		margin-bottom: 1rem;
		font-size: 1.4rem;
		border-bottom: 2px solid #3498db;
		padding-bottom: 0.5rem;
	}

	.shortcut-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 0.75rem;
	}

	.shortcut-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		background: var(--bg-primary, #f9f9f9);
		border: 1px solid #e8e8e8;
		border-radius: 8px;
		padding: 0.85rem 1rem;
		transition: box-shadow 0.2s, border-color 0.2s;
	}

	.shortcut-card:hover {
		border-color: #3498db;
		box-shadow: 0 2px 8px rgba(52, 152, 219, 0.15);
	}

	.keys {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		flex-shrink: 0;
	}

	kbd {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		border: 1px solid #ccc;
		border-bottom: 3px solid #aaa;
		border-radius: 5px;
		padding: 0.2rem 0.5rem;
		font-family: 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
		font-size: 0.78rem;
		font-weight: 700;
		color: #2c3e50;
		min-width: 1.8rem;
		text-align: center;
		white-space: nowrap;
	}

	.plus {
		color: #aaa;
		font-size: 0.75rem;
		font-weight: 700;
	}

	.shortcut-info {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.shortcut-label {
		font-weight: 600;
		font-size: 0.9rem;
		color: var(--text-primary, #2c3e50);
	}

	.shortcut-desc {
		font-size: 0.78rem;
		color: #7f8c8d;
		font-family: 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
	}

	.tip-box {
		background: #fffde7;
		border: 1px solid #ffe082;
		border-radius: 8px;
		padding: 1.25rem 1.5rem;
		margin: 2rem 0;
	}

	.tip-box h3 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
		color: #856404;
	}

	.tip-box ul {
		margin: 0;
		padding-left: 1.5rem;
		line-height: 1.9;
	}

	.tip-box li {
		color: #5a4009;
		font-size: 0.9rem;
		margin-bottom: 0.2rem;
	}

	code {
		background: rgba(0, 0, 0, 0.06);
		padding: 0.1em 0.35em;
		border-radius: 3px;
		font-size: 0.88em;
		font-family: 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
	}

	strong {
		font-weight: 700;
	}

	.cta-box {
		text-align: center;
		background: linear-gradient(135deg, #3498db, #2ecc71);
		color: white;
		border-radius: 10px;
		padding: 2.5rem;
		margin: 2rem 0;
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

		h2 {
			font-size: 1.2rem;
		}

		.shortcut-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
