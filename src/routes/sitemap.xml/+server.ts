import { SITE_URL } from '$lib/config';
import { posts } from '$lib/data/posts';

export const prerender = true;

// 정적 페이지 목록 — 새 페이지 추가 시 여기에 한 줄 추가하면 sitemap에 자동 반영됩니다.
const staticRoutes: { path: string; changefreq: string; priority: string }[] = [
	{ path: '/', changefreq: 'weekly', priority: '1.0' },
	{ path: '/editor', changefreq: 'monthly', priority: '0.9' },
	{ path: '/blog', changefreq: 'weekly', priority: '0.9' },
	{ path: '/guide', changefreq: 'monthly', priority: '0.8' },
	{ path: '/templates', changefreq: 'monthly', priority: '0.8' },
	{ path: '/use-cases', changefreq: 'monthly', priority: '0.8' },
	{ path: '/compare', changefreq: 'monthly', priority: '0.8' },
	{ path: '/shortcuts', changefreq: 'monthly', priority: '0.6' },
	{ path: '/about', changefreq: 'monthly', priority: '0.6' },
	{ path: '/faq', changefreq: 'monthly', priority: '0.6' },
	{ path: '/changelog', changefreq: 'monthly', priority: '0.6' },
	{ path: '/privacy', changefreq: 'yearly', priority: '0.4' },
	{ path: '/terms', changefreq: 'yearly', priority: '0.4' }
];

function urlEntry(loc: string, lastmod: string, changefreq: string, priority: string): string {
	return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export function GET() {
	// 블로그 글 중 가장 최근 날짜를 정적 페이지의 lastmod 기준으로 사용
	const latest = posts.reduce((max, p) => (p.date > max ? p.date : max), '2026-01-01');

	const staticEntries = staticRoutes.map((r) =>
		urlEntry(`${SITE_URL}${r.path}`, latest, r.changefreq, r.priority)
	);

	const postEntries = posts.map((p) =>
		urlEntry(`${SITE_URL}/blog/${p.slug}`, p.date, 'monthly', '0.9')
	);

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...postEntries].join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
