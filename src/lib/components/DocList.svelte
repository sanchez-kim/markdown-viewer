<script lang="ts">
	import { docStore } from '$lib/stores/documents';
	const { docs } = docStore;
	import { getHistory, clearHistory, type HistoryEntry } from '$lib/stores/history';

	interface Props {
		activeDocId: string;
		onSwitch: (id: string) => void;
		onNew: () => void;
		onDelete: (id: string) => void;
		onRestore: (markdown: string) => void;
	}

	let { activeDocId, onSwitch, onNew, onDelete, onRestore }: Props = $props();

	let tab: 'docs' | 'history' = $state('docs');
	let history: HistoryEntry[] = $state([]);

	$effect(() => {
		if (tab === 'history' && activeDocId) {
			history = getHistory(activeDocId);
		}
	});

	function handleDelete(e: MouseEvent, id: string) {
		e.stopPropagation();
		if (!confirm('문서를 삭제하시겠습니까?')) return;
		onDelete(id);
	}

	function handleRestore(entry: HistoryEntry) {
		if (!confirm('이 버전으로 복원하시겠습니까? 현재 내용은 이력에 저장됩니다.')) return;
		onRestore(entry.markdown);
		tab = 'docs';
	}

	function handleClearHistory() {
		if (!confirm('이력을 모두 삭제하시겠습니까?')) return;
		clearHistory(activeDocId);
		history = [];
	}

	function formatRelativeTime(isoString: string): string {
		const diff = Date.now() - new Date(isoString).getTime();
		const mins = Math.floor(diff / 60000);
		if (mins < 1) return '방금';
		if (mins < 60) return `${mins}분 전`;
		const hours = Math.floor(mins / 60);
		if (hours < 24) return `${hours}시간 전`;
		const days = Math.floor(hours / 24);
		return `${days}일 전`;
	}

	function formatTime(isoString: string): string {
		return new Date(isoString).toLocaleString('ko-KR', {
			month: 'short', day: 'numeric',
			hour: '2-digit', minute: '2-digit'
		});
	}
</script>

<aside class="doc-list">
	<div class="tabs">
		<button class="tab" class:active={tab === 'docs'} onclick={() => tab = 'docs'}>
			문서
		</button>
		<button class="tab" class:active={tab === 'history'} onclick={() => { tab = 'history'; history = getHistory(activeDocId); }}>
			이력
		</button>
	</div>

	{#if tab === 'docs'}
		<button class="new-doc-btn" onclick={onNew}>
			＋ 새 문서
		</button>
		<ul class="doc-list-items">
			{#each $docs as doc (doc.id)}
				<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
				<li
					class="doc-item"
					class:active={doc.id === activeDocId}
					onclick={() => onSwitch(doc.id)}
					role="button"
					tabindex="0"
					onkeydown={(e) => e.key === 'Enter' && onSwitch(doc.id)}
				>
					<div class="doc-item-inner">
						<span class="doc-icon">📄</span>
						<div class="doc-info">
							<span class="doc-title">{doc.title.replace(/\.md$/, '')}</span>
							<span class="doc-time">{formatRelativeTime(doc.updatedAt)}</span>
						</div>
						{#if $docs.length > 1}
							<button
								class="doc-delete"
								onclick={(e) => handleDelete(e, doc.id)}
								title="삭제"
								aria-label="문서 삭제"
							>×</button>
						{/if}
					</div>
					{#if doc.preview}
						<p class="doc-preview">{doc.preview}</p>
					{/if}
				</li>
			{/each}
		</ul>
	{:else}
		<div class="history-header">
			<span class="history-count">{history.length}개 버전</span>
			{#if history.length > 0}
				<button class="clear-history-btn" onclick={handleClearHistory}>전체 삭제</button>
			{/if}
		</div>
		{#if history.length === 0}
			<p class="empty-state">저장된 이력이 없습니다.<br>Ctrl+S로 저장하면 이력이 생깁니다.</p>
		{:else}
			<ul class="history-list">
				{#each history as entry (entry.ts)}
					<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
					<li class="history-item" onclick={() => handleRestore(entry)} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && handleRestore(entry)}>
						<div class="history-label">{entry.label}</div>
						<div class="history-time">{formatTime(entry.ts)}</div>
					</li>
				{/each}
			</ul>
		{/if}
	{/if}
</aside>

<style>
	.doc-list {
		width: 220px;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		border-right: 1px solid var(--border-color, #e1e4e8);
		background: var(--sidebar-bg, #f6f8fa);
		overflow: hidden;
	}

	.tabs {
		display: flex;
		border-bottom: 1px solid var(--border-color, #e1e4e8);
	}

	.tab {
		flex: 1;
		padding: 10px 0;
		border: none;
		background: none;
		font-size: 13px;
		cursor: pointer;
		color: var(--text-muted, #6a737d);
		border-bottom: 2px solid transparent;
		margin-bottom: -1px;
		transition: color 0.15s;
	}

	.tab.active {
		color: var(--text-primary, #24292e);
		border-bottom-color: var(--accent-color, #667eea);
		font-weight: 500;
	}

	.new-doc-btn {
		margin: 10px 10px 6px;
		padding: 7px 10px;
		border: 1px dashed var(--border-color, #d0d7de);
		border-radius: 6px;
		background: none;
		font-size: 12px;
		cursor: pointer;
		color: var(--text-muted, #6a737d);
		text-align: left;
		transition: background 0.15s, color 0.15s;
	}

	.new-doc-btn:hover {
		background: var(--hover-bg, #eaeef2);
		color: var(--text-primary, #24292e);
	}

	.doc-list-items {
		list-style: none;
		margin: 0;
		padding: 4px 6px;
		overflow-y: auto;
		flex: 1;
	}

	.doc-item {
		padding: 8px 6px;
		border-radius: 6px;
		cursor: pointer;
		transition: background 0.12s;
		margin-bottom: 2px;
	}

	.doc-item:hover {
		background: var(--hover-bg, #eaeef2);
	}

	.doc-item.active {
		background: var(--active-bg, #dbeafe);
	}

	.doc-item-inner {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.doc-icon {
		font-size: 14px;
		flex-shrink: 0;
	}

	.doc-info {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.doc-title {
		font-size: 13px;
		font-weight: 500;
		color: var(--text-primary, #24292e);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.doc-time {
		font-size: 11px;
		color: var(--text-muted, #6a737d);
	}

	.doc-delete {
		flex-shrink: 0;
		width: 20px;
		height: 20px;
		border: none;
		background: none;
		color: var(--text-muted, #6a737d);
		cursor: pointer;
		border-radius: 4px;
		font-size: 14px;
		line-height: 1;
		opacity: 0;
		transition: opacity 0.12s, background 0.12s;
	}

	.doc-item:hover .doc-delete {
		opacity: 1;
	}

	.doc-delete:hover {
		background: var(--danger-bg, #ffeef0);
		color: var(--danger-color, #d73a49);
	}

	.doc-preview {
		margin: 3px 0 0 20px;
		font-size: 11px;
		color: var(--text-muted, #6a737d);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* History tab */
	.history-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px 12px;
		border-bottom: 1px solid var(--border-color, #e1e4e8);
	}

	.history-count {
		font-size: 12px;
		color: var(--text-muted, #6a737d);
	}

	.clear-history-btn {
		font-size: 11px;
		border: none;
		background: none;
		color: var(--danger-color, #d73a49);
		cursor: pointer;
		padding: 2px 4px;
		border-radius: 4px;
	}

	.clear-history-btn:hover {
		background: var(--danger-bg, #ffeef0);
	}

	.history-list {
		list-style: none;
		margin: 0;
		padding: 4px 6px;
		overflow-y: auto;
		flex: 1;
	}

	.history-item {
		padding: 8px 8px;
		border-radius: 6px;
		cursor: pointer;
		margin-bottom: 2px;
		transition: background 0.12s;
	}

	.history-item:hover {
		background: var(--hover-bg, #eaeef2);
	}

	.history-label {
		font-size: 12px;
		font-weight: 500;
		color: var(--text-primary, #24292e);
	}

	.history-time {
		font-size: 11px;
		color: var(--text-muted, #6a737d);
		margin-top: 2px;
	}

	.empty-state {
		padding: 24px 12px;
		text-align: center;
		font-size: 12px;
		color: var(--text-muted, #6a737d);
		line-height: 1.6;
	}

	/* Dark mode */
	:global([data-theme='dark']) .doc-list {
		--sidebar-bg: #161b22;
		--border-color: #30363d;
		--hover-bg: #21262d;
		--active-bg: #1d2d50;
		--text-primary: #e6edf3;
		--text-muted: #8b949e;
	}
</style>
