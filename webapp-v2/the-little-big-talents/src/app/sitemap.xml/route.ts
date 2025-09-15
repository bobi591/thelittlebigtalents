import { NextResponse } from 'next/server';
import { NavbarItem, NavbarData } from '../components/navbar/data';

const SITE_URL = 'https://www.thelittlebigtalents.bg';

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

function generateSiteMap(linksWithDepth: { link: string; depth: number }[]) {
  const urls = linksWithDepth
    .map(
      ({ link, depth }) => `
    <url>
      <loc>${SITE_URL}${link}</loc>
      <changefreq>weekly</changefreq>
      <priority>${getPriority(depth)}</priority>
    </url>`,
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;
}

export async function GET() {
  const linksWithDepth = extractLinksWithDepth(NavbarData);
  const sitemap = generateSiteMap(linksWithDepth);

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
