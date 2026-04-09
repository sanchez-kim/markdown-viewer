import { browser } from '$app/environment';

export interface HistoryEntry {
	ts: string;
	markdown: string;
	label: string;
}

const MAX_ENTRIES = 20;

function historyKey(docId: string): string {
	return `easymd-history-${docId}`;
}

function readHistory(docId: string): HistoryEntry[] {
	if (!browser || !docId) return [];
	try {
		const raw = localStorage.getItem(historyKey(docId));
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

function writeHistory(docId: string, entries: HistoryEntry[]) {
	if (!browser || !docId) return;
	try {
		localStorage.setItem(historyKey(docId), JSON.stringify(entries));
	} catch {
		// QuotaExceeded: drop oldest entry and retry
		const trimmed = entries.slice(0, -1);
		if (trimmed.length > 0) {
			try {
				localStorage.setItem(historyKey(docId), JSON.stringify(trimmed));
			} catch {
				// give up silently
			}
		}
	}
}

export function pushHistory(docId: string, markdown: string, label = '자동저장') {
	if (!browser || !docId) return;
	const entries = readHistory(docId);
	// Skip if content is identical to most recent entry
	if (entries.length > 0 && entries[0].markdown === markdown) return;
	const entry: HistoryEntry = { ts: new Date().toISOString(), markdown, label };
	writeHistory(docId, [entry, ...entries].slice(0, MAX_ENTRIES));
}

export function getHistory(docId: string): HistoryEntry[] {
	return readHistory(docId);
}

export function clearHistory(docId: string) {
	if (!browser || !docId) return;
	localStorage.removeItem(historyKey(docId));
}

export function deleteDocHistory(docId: string) {
	clearHistory(docId);
}
