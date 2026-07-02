<script lang="ts">
	import { docStore } from '$lib/stores/documents';
	const { docs, openTabIds } = docStore;

	interface Props {
		activeDocId: string;
		onSwitch: (id: string) => void;
		onNew: () => void;
		onClose: (id: string) => void;
	}

	let { activeDocId, onSwitch, onNew, onClose }: Props = $props();

	const tabs = $derived(
		$openTabIds.map((id) => $docs.find((d) => d.id === id)).filter((d) => d !== undefined)
	);

	function handleClose(e: MouseEvent, id: string) {
		e.stopPropagation();
		onClose(id);
	}
</script>

<div class="tab-bar">
	<div class="tab-scroll">
		{#each tabs as doc (doc.id)}
			<div
				class="tab"
				class:active={doc.id === activeDocId}
				onclick={() => onSwitch(doc.id)}
				role="button"
				tabindex="0"
				title={doc.title}
				onkeydown={(e) => e.key === 'Enter' && onSwitch(doc.id)}
			>
				<span class="tab-title">{doc.title.replace(/\.md$/, '')}</span>
				{#if tabs.length > 1}
					<button class="tab-close" onclick={(e) => handleClose(e, doc.id)} title="탭 닫기" aria-label="탭 닫기">×</button>
				{/if}
			</div>
		{/each}
	</div>
	<button class="new-tab-btn" onclick={onNew} title="새 문서" aria-label="새 문서">+</button>
</div>

<style>
	.tab-bar {
		display: flex;
		align-items: stretch;
		background: var(--tabbar-bg, #eef0f3);
		border-bottom: 1px solid var(--border-color, #e1e4e8);
		flex-shrink: 0;
	}

	.tab-scroll {
		display: flex;
		overflow-x: auto;
		flex: 1;
		min-width: 0;
		scrollbar-width: thin;
	}

	.tab {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 0 10px;
		height: 36px;
		max-width: 180px;
		flex-shrink: 0;
		cursor: pointer;
		border-right: 1px solid var(--border-color, #e1e4e8);
		color: var(--text-muted, #6a737d);
		font-size: 13px;
		transition: background-color 0.12s, color 0.12s;
	}

	.tab:hover {
		background: var(--hover-bg, #e2e5ea);
	}

	.tab.active {
		background: var(--bg-primary, #fff);
		color: var(--text-primary, #24292e);
		font-weight: 500;
		box-shadow: inset 0 -2px 0 var(--accent-color, #667eea);
	}

	.tab-title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tab-close {
		flex-shrink: 0;
		width: 16px;
		height: 16px;
		border: none;
		background: none;
		color: inherit;
		cursor: pointer;
		border-radius: 4px;
		font-size: 13px;
		line-height: 1;
		opacity: 0.6;
		padding: 0;
	}

	.tab-close:hover {
		opacity: 1;
		background: var(--danger-bg, #ffeef0);
		color: var(--danger-color, #d73a49);
	}

	.new-tab-btn {
		flex-shrink: 0;
		width: 36px;
		height: 36px;
		border: none;
		border-left: 1px solid var(--border-color, #e1e4e8);
		background: none;
		color: var(--text-muted, #6a737d);
		font-size: 18px;
		cursor: pointer;
		transition: background-color 0.12s, color 0.12s;
	}

	.new-tab-btn:hover {
		background: var(--hover-bg, #e2e5ea);
		color: var(--text-primary, #24292e);
	}

	@media (max-width: 600px) {
		.tab {
			max-width: 120px;
		}
	}

	:global([data-theme='dark']) .tab-bar {
		--tabbar-bg: #0d1117;
		--border-color: #30363d;
		--hover-bg: #21262d;
		--text-primary: #e6edf3;
		--text-muted: #8b949e;
		--bg-primary: #161b22;
	}
</style>
