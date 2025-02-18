import { NextApiRequest, NextApiResponse } from 'next';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const links = [
      { url: '/', changefreq: 'daily', priority: 1 },
      { url: '/blog', changefreq: 'daily', priority: 0.9 },
      { url: '/services', changefreq: 'weekly', priority: 0.8 },
      // Add more URLs
    ] as const;

    // Create a stream to write to
    const stream = new SitemapStream({ hostname: 'https://your-domain.com' });

    // Return a promise that resolves with your XML string
    const xmlString = await streamToPromise(
      Readable.from(links).pipe(stream)
    ).then((data: Buffer) => data.toString());

    res.writeHead(200, {
      'Content-Type': 'application/xml',
    });

    res.end(xmlString);
  } catch (e) {
    console.log(e);
    res.send(JSON.stringify(e));
  }
} 