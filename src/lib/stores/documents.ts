import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

export interface DocMeta {
	id: string;
	title: string;
	createdAt: string;
	updatedAt: string;
	preview: string;
}

const KEYS = {
	index: 'easymd-docs-index',
	activeDoc: 'easymd-active-doc',
	doc: (id: string) => `easymd-doc-${id}`,
};

const LEGACY = {
	content: 'markdown-viewer-content',
	filename: 'markdown-viewer-filename',
	timestamp: 'markdown-viewer-timestamp',
};

function generateId(): string {
	return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function readIndex(): DocMeta[] {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(KEYS.index);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

function writeIndex(list: DocMeta[]) {
	if (!browser) return;
	localStorage.setItem(KEYS.index, JSON.stringify(list));
}

function readContent(id: string): string {
	if (!browser) return '';
	return localStorage.getItem(KEYS.doc(id)) || '';
}

function writeContent(id: string, content: string) {
	if (!browser) return;
	try {
		localStorage.setItem(KEYS.doc(id), content);
	} catch (error) {
		const isQuota = error instanceof DOMException &&
			(error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED');
		if (isQuota) throw error;
	}
}

function createDocStore() {
	const docs = writable<DocMeta[]>([]);
	const activeId = writable<string>('');

	function init(): { content: string; meta: DocMeta | null } {
		if (!browser) return { content: '', meta: null };

		// Migrate legacy single-doc data
		const legacyContent = localStorage.getItem(LEGACY.content);
		if (legacyContent !== null) {
			const id = generateId();
			const title = localStorage.getItem(LEGACY.filename) || 'untitled.md';
			const ts = localStorage.getItem(LEGACY.timestamp) || new Date().toISOString();
			const meta: DocMeta = {
				id, title,
				createdAt: ts, updatedAt: ts,
				preview: legacyContent.slice(0, 100),
			};
			writeContent(id, legacyContent);
			writeIndex([meta]);
			localStorage.setItem(KEYS.activeDoc, id);
			localStorage.removeItem(LEGACY.content);
			localStorage.removeItem(LEGACY.filename);
			localStorage.removeItem(LEGACY.timestamp);
			docs.set([meta]);
			activeId.set(id);
			return { content: legacyContent, meta };
		}

		const list = readIndex();
		if (list.length === 0) {
			return _createDoc('untitled.md', '');
		}

		docs.set(list);
		const savedActive = localStorage.getItem(KEYS.activeDoc) || list[0].id;
		const validActive = list.find(d => d.id === savedActive) ? savedActive : list[0].id;
		activeId.set(validActive);
		const content = readContent(validActive);
		const meta = list.find(d => d.id === validActive) || list[0];
		return { content, meta };
	}

	function _createDoc(title: string, content: string): { content: string; meta: DocMeta } {
		const id = generateId();
		const now = new Date().toISOString();
		const meta: DocMeta = {
			id, title,
			createdAt: now, updatedAt: now,
			preview: content.slice(0, 100),
		};
		writeContent(id, content);
		docs.update(list => {
			const next = [meta, ...list];
			writeIndex(next);
			return next;
		});
		if (browser) localStorage.setItem(KEYS.activeDoc, id);
		activeId.set(id);
		return { content, meta };
	}

	function createDoc(title = 'untitled.md', content = ''): { content: string; meta: DocMeta } {
		return _createDoc(title, content);
	}

	function saveDoc(id: string, content: string, title: string) {
		if (!browser || !id) return;
		writeContent(id, content);
		docs.update(list => {
			const next = list.map(d =>
				d.id === id
					? { ...d, title, updatedAt: new Date().toISOString(), preview: content.slice(0, 100) }
					: d
			);
			writeIndex(next);
			return next;
		});
	}

	function switchDoc(id: string): { content: string; meta: DocMeta | null } {
		if (!browser) return { content: '', meta: null };
		localStorage.setItem(KEYS.activeDoc, id);
		activeId.set(id);
		const content = readContent(id);
		const meta = get(docs).find(d => d.id === id) || null;
		return { content, meta };
	}

	function deleteDoc(id: string): { content: string; meta: DocMeta | null } {
		if (!browser) return { content: '', meta: null };
		localStorage.removeItem(KEYS.doc(id));
		let nextId = '';
		docs.update(list => {
			const next = list.filter(d => d.id !== id);
			writeIndex(next);
			nextId = next.length > 0 ? next[0].id : '';
			return next;
		});
		if (nextId) return switchDoc(nextId);
		return _createDoc('untitled.md', '');
	}

	function renameDoc(id: string, title: string) {
		docs.update(list => {
			const next = list.map(d => d.id === id ? { ...d, title } : d);
			writeIndex(next);
			return next;
		});
	}

	return { docs, activeId, init, createDoc, saveDoc, switchDoc, deleteDoc, renameDoc };
}

export const docStore = createDocStore();
