import type { MetadataRoute } from 'next';
import { NavbarItem, NavbarData } from '@/app/components/navbar/data';

const SITE_URL = 'https://www.thelittlebigtalents.bg';

// Navbar entries that don't have a page yet. They 404, so listing them in the
// sitemap would only produce errors in Search Console. Remove a link from here
// once its page exists.
const UNPUBLISHED_LINKS = new Set(['/achievements', '/summer-lessons']);

// Recursive function to collect links with depth
function extractLinksWithDepth(items: NavbarItem[], depth = 0): { link: string; depth: number }[] {
  let links: { link: string; depth: number }[] = [];

  for (const item of items) {
    if (item.link) links.push({ link: item.link, depth });
    if (item.children) links = links.concat(extractLinksWithDepth(item.children, depth + 1));
  }

  return links;
}

// Calculate priority based on depth
function getPriority(depth: number): number {
  switch (depth) {
    case 0:
      return 1.0; // top-level pages
    case 1:
      return 0.8; // first-level children
    case 2:
      return 0.6; // second-level children
    default:
      return 0.5; // deeper pages
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  return extractLinksWithDepth(NavbarData)
    .filter(({ link }) => !UNPUBLISHED_LINKS.has(link))
    .map(({ link, depth }) => ({
      url: `${SITE_URL}${link}`,
      changeFrequency: 'weekly',
      priority: getPriority(depth),
    }));
}
