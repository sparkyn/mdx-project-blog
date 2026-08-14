import RSS from "rss";

import { getBlogPostList } from "@/helpers/file-helpers";

export async function GET() {
  const blogPostList = await getBlogPostList();

  const feed = new RSS({
    title: "Bits &amp; Bytes",
    description: "A wonderful blog about JavaScript",
    feed_url: "http://localhost:3000/rss.xml",
    site_url: "http://localhost:3000/",
    managingEditor: "Simon Parkyn",
    webMaster: "Simon Parkyn",
    copyright: "2026 Simon Parkyn",
    language: "en",
    pubDate: new Date(),
    ttl: "60",
  });

  {
    blogPostList.forEach(({ slug, title, abstract, publishedOn }) =>
      feed.item({
        title: title,
        description: abstract,
        url: `http://localhost:3000/${slug}`,
        date: publishedOn,
      })
    );
  }

  const xml = feed.xml();

  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}
