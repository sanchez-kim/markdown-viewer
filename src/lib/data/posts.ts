import { marked } from 'marked';

export interface Post {
	slug: string;
	title: string;
	date: string;
	excerpt: string;
	category: string;
	readingTime: number;
	content: string; // 렌더된 HTML
}

// src/lib/posts/*.md 를 빌드 시 모두 수집 (글 추가 = .md 파일 추가만 하면 자동 반영)
const rawFiles = import.meta.glob('../posts/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

interface Frontmatter {
	title?: string;
	date?: string;
	excerpt?: string;
	category?: string;
	readingTime?: string;
}

function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
	const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
	if (!match) return { data: {}, body: raw };
	const data: Record<string, string> = {};
	for (const line of match[1].split('\n')) {
		const i = line.indexOf(':');
		if (i === -1) continue;
		const key = line.slice(0, i).trim();
		let val = line.slice(i + 1).trim();
		val = val.replace(/^["']|["']$/g, ''); // 양끝 따옴표 제거(있으면)
		data[key] = val;
	}
	return { data: data as Frontmatter, body: match[2] };
}

// 한국어 기준 대략 분당 500자
function estimateReadingTime(plainText: string): number {
	const chars = plainText.replace(/\s/g, '').length;
	return Math.max(1, Math.round(chars / 500));
}

function slugFromPath(path: string): string {
	return (path.split('/').pop() ?? '').replace(/\.md$/, '');
}

export const posts: Post[] = Object.entries(rawFiles)
	.map(([path, raw]) => {
		const slug = slugFromPath(path);
		const { data, body } = parseFrontmatter(raw);
		const content = marked.parse(body, { async: false }) as string;
		const plain = body.replace(/[#>*`_\-[\]()!]/g, ' ');
		return {
			slug,
			title: data.title ?? slug,
			date: data.date ?? '',
			excerpt: data.excerpt ?? '',
			category: data.category ?? '기타',
			readingTime: data.readingTime ? Number(data.readingTime) : estimateReadingTime(plain),
			content
		};
	})
	.sort((a, b) => b.date.localeCompare(a.date)); // 최신순

export function getPost(slug: string): Post | undefined {
	return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
	return posts.map((p) => p.slug);
}
