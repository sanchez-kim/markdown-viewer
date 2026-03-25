<script lang="ts">
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme';

	const isMac = typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform);

	const mod = isMac ? '⌘' : 'Ctrl';
	const alt = isMac ? '⌥' : 'Alt';
	const shift = 'Shift';

	onMount(() => {
		document.title = '단축키 모음 - 이지 마크다운';
		themeStore.init();
	});

	interface Shortcut {
		keys: string[];
		label: string;
		desc?: string;
	}

	interface ShortcutGroup {
		icon: string;
		title: string;
		items: Shortcut[];
	}

	const groups: ShortcutGroup[] = [
		{
			icon: '✏️',
			title: '서식 (Formatting)',
			items: [
				{ keys: ['Ctrl/⌘', 'B'], label: '굵게 (Bold)', desc: '**텍스트**' },
				{ keys: ['Ctrl/⌘', 'I'], label: '기울임 (Italic)', desc: '*텍스트*' },
				{ keys: ['Ctrl/⌘', 'U'], label: '밑줄 (Underline)', desc: '<u>텍스트</u>' },
				{ keys: ['Ctrl/⌘', 'K'], label: '링크 삽입 (Link)', desc: '[텍스트](url)' },
				{ keys: ['Ctrl/⌘', '`'], label: '인라인 코드 (Inline Code)', desc: '`코드`' },
				{ keys: ['Ctrl/⌘', 'Shift', 'S'], label: '취소선 (Strikethrough)', desc: '~~텍스트~~' },
			]
		},
		{
			icon: '📦',
			title: '블록 (Block)',
			items: [
				{ keys: ['Ctrl/⌘', 'Shift', 'H'], label: '제목 순환 (Heading)', desc: 'H1 → H2 → H3 → 본문' },
				{ keys: ['Ctrl/⌘', 'Alt', 'C'], label: '코드 블록 (Code Block)', desc: '```언어' },
				{ keys: ['Ctrl/⌘', 'Shift', 'B'], label: '인용구 (Blockquote)', desc: '> 인용' },
				{ keys: ['Ctrl/⌘', 'Shift', '7'], label: '번호 목록 (Ordered List)', desc: '1. 항목' },
				{ keys: ['Ctrl/⌘', 'Shift', '8'], label: '글머리 목록 (Bullet List)', desc: '- 항목' },
				{ keys: ['Ctrl/⌘', 'Shift', '9'], label: '체크리스트 (Task List)', desc: '- [ ] 항목' },
			]
		},
		{
			icon: '💾',
			title: '파일 (File)',
			items: [
				{ keys: ['Ctrl/⌘', 'S'], label: '저장 (Save)', desc: '마크다운 파일(.md) 저장' },
				{ keys: ['Ctrl/⌘', 'O'], label: '열기 (Open)', desc: '마크다운 파일(.md) 불러오기' },
				{ keys: ['Ctrl/⌘', 'Shift', 'E'], label: '내보내기 (Export)', desc: 'PDF / DOCX 내보내기 메뉴' },
			]
		},
		{
			icon: '⚙️',
			title: '편집기 (Editor)',
			items: [
				{ keys: ['/'], label: '슬래시 메뉴 (Slash Menu)', desc: '빈 줄에서 / 입력 → 블록 삽입 메뉴' },
				{ keys: ['Ctrl/⌘', 'Z'], label: '실행 취소 (Undo)' },
				{ keys: ['Ctrl/⌘', 'Shift', 'Z'], label: '다시 실행 (Redo)' },
				{ keys: ['Ctrl/⌘', 'A'], label: '전체 선택 (Select All)' },
				{ keys: ['Ctrl/⌘', 'C'], label: '복사 (Copy)' },
				{ keys: ['Ctrl/⌘', 'X'], label: '잘라내기 (Cut)' },
				{ keys: ['Ctrl/⌘', 'V'], label: '붙여넣기 (Paste)', desc: '이미지 붙여넣기도 지원' },
				{ keys: ['Tab'], label: '들여쓰기 (Indent)', desc: '목록 항목 내에서 사용' },
				{ keys: ['Shift', 'Tab'], label: '내어쓰기 (Outdent)', desc: '목록 항목 내에서 사용' },
			]
		}
	];
</script>

<svelte:head>
	<title>단축키 모음 — EasyMD 이지 마크다운</title>
	<meta name="description" content="EasyMD 마크다운 에디터의 모든 단축키를 한눈에 확인하세요. 서식, 블록, 파일 저장까지 Mac / Windows 단축키 병기." />
	<meta name="keywords" content="마크다운 에디터 단축키, markdown 단축키, EasyMD 단축키, 마크다운 키보드 단축키" />
	<meta property="og:title" content="단축키 모음 — EasyMD" />
	<meta property="og:description" content="EasyMD 마크다운 에디터의 모든 단축키를 한눈에 확인하세요." />
	<meta property="og:url" content="https://easymd.netlify.app/shortcuts" />
	<meta property="og:type" content="article" />
</svelte:head>

<div class="shortcuts-page">
	<div class="container">
		<a href="/" class="back-nav">← EasyMD로 돌아가기</a>

		<h1>단축키 모음</h1>
		<p class="tagline">EasyMD의 모든 키보드 단축키 — Mac / Windows 병기</p>

		<div class="os-badge-row">
			<span class="os-badge mac">⌘ Mac: Command (Cmd)</span>
			<span class="os-badge win">Ctrl Windows / Linux: Ctrl</span>
		</div>

		{#each groups as group}
		<section>
			<h2>{group.icon} {group.title}</h2>
			<div class="shortcut-grid">
				{#each group.items as item}
				<div class="shortcut-card">
					<div class="keys">
						{#each item.keys as key, i}
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
			<h3>💡 팁</h3>
			<ul>
				<li><strong>Mac</strong>에서는 <code>Ctrl</code> 대신 <code>⌘ Command</code>를 사용합니다.</li>
				<li>슬래시 메뉴(<code>/</code>)는 <strong>빈 줄의 맨 앞</strong>에서 입력해야 활성화됩니다.</li>
				<li>텍스트를 선택하면 <strong>BubbleMenu</strong>가 자동으로 나타납니다.</li>
				<li>이미지는 <code>Ctrl/⌘+V</code>로 클립보드에서 바로 붙여넣을 수 있습니다.</li>
			</ul>
		</div>

		<div class="cta-box">
			<p>⌨️ 단축키를 직접 사용해보세요!</p>
			<a href="/" class="cta-button">EasyMD 에디터 열기</a>
		</div>

		<div class="back-link">
			<a href="/">← EasyMD로 돌아가기</a>
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
