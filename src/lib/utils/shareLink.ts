import LZString from 'lz-string';
import { browser } from '$app/environment';

const HASH_PREFIX = '#share=';
const SIZE_WARNING_BYTES = 20 * 1024; // 20KB

export function encodeShareLink(markdown: string): string | null {
	if (!browser) return null;
	const compressed = LZString.compressToEncodedURIComponent(markdown);
	return `${location.origin}${location.pathname}${HASH_PREFIX}${compressed}`;
}

export function decodeShareHash(hash: string): string | null {
	if (!hash.startsWith(HASH_PREFIX)) return null;
	try {
		const result = LZString.decompressFromEncodedURIComponent(hash.slice(HASH_PREFIX.length));
		return result || null;
	} catch {
		return null;
	}
}

export function isShareLink(): boolean {
	if (!browser) return false;
	return location.hash.startsWith(HASH_PREFIX);
}

export function clearShareHash() {
	if (!browser) return;
	history.replaceState(null, '', location.pathname);
}

export function getShareLinkWarning(markdown: string): string | null {
	if (markdown.length > SIZE_WARNING_BYTES) {
		return `문서가 커서 (${Math.round(markdown.length / 1024)}KB) 공유 링크가 매우 길 수 있습니다.`;
	}
	if (/data:image\//.test(markdown)) {
		return '이미지가 포함되어 있어 공유 링크가 매우 길 수 있습니다.';
	}
	return null;
}
