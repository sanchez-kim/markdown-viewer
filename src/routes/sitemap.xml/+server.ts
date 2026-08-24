import { SITE_URL } from '$lib/config';
import { posts } from '$lib/data/posts';

export const prerender = true;

// 정적 페이지 목록 — 새 페이지 추가 시 여기에 한 줄 추가하면 sitemap에 자동 반영됩니다.
//
// lastmod는 그 페이지를 마지막으로 의미 있게 고친 날짜다. 페이지 내용을 수정하면
// 이 값도 함께 갱신할 것. (전에는 "가장 최근 블로그 글 날짜"를 모든 정적 페이지에
// 일괄로 넣어, 고치지도 않은 페이지가 매번 갱신된 것처럼 보이는 거짓 신호를 보냈다.)
const staticRoutes: { path: string; lastmod: string; changefreq: string; priority: string }[] = [
	{ path: '/', lastmod: '2026-06-09', changefreq: 'weekly', priority: '1.0' },
	{ path: '/editor', lastmod: '2026-08-18', changefreq: 'monthly', priority: '0.9' },
	{ path: '/blog', lastmod: '2026-08-24', changefreq: 'weekly', priority: '0.9' },
	{ path: '/guide', lastmod: '2026-06-08', changefreq: 'monthly', priority: '0.8' },
	{ path: '/templates', lastmod: '2026-06-09', changefreq: 'monthly', priority: '0.8' },
	{ path: '/use-cases', lastmod: '2026-08-18', changefreq: 'monthly', priority: '0.8' },
	{ path: '/compare', lastmod: '2026-08-18', changefreq: 'monthly', priority: '0.8' },
	{ path: '/shortcuts', lastmod: '2026-06-09', changefreq: 'monthly', priority: '0.6' },
	{ path: '/about', lastmod: '2026-08-18', changefreq: 'monthly', priority: '0.6' },
	{ path: '/faq', lastmod: '2026-08-18', changefreq: 'monthly', priority: '0.6' },
	{ path: '/changelog', lastmod: '2026-06-09', changefreq: 'monthly', priority: '0.6' },
	{ path: '/privacy', lastmod: '2026-08-18', changefreq: 'yearly', priority: '0.4' },
	{ path: '/terms', lastmod: '2026-08-18', changefreq: 'yearly', priority: '0.4' }
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
	const staticEntries = staticRoutes.map((r) =>
		urlEntry(`${SITE_URL}${r.path}`, r.lastmod, r.changefreq, r.priority)
	);

	// 글은 frontmatter의 updated(없으면 date)를 lastmod로 사용
	const postEntries = posts.map((p) =>
		urlEntry(`${SITE_URL}/blog/${p.slug}`, p.updated, 'monthly', '0.9')
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
