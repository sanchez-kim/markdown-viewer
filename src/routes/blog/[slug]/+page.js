import { getAllSlugs } from '$lib/data/posts';

export const prerender = true;

export function entries() {
	return getAllSlugs().map(slug => ({ slug }));
}
