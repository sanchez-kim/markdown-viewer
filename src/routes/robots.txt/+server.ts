import { SITE_URL } from '$lib/config';

export const prerender = true;

export function GET() {
	const body = `# Allow all crawlers
User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml
`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain' }
	});
}
