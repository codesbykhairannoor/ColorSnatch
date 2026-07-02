import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toolsList = [
    { id: 'image-color-picker', path: '' },
    { id: 'hex-color-picker-from-image', path: 'hex-color-picker-from-image' },
    { id: 'extract-color-from-image', path: 'extract-color-from-image' },
    { id: 'color-palette-generator', path: 'color-palette-generator' }
];

const languagesList = ['en', 'id', 'es', 'fr', 'de', 'ja', 'zh'];
const baseUrl = 'https://imagecolorpicky.local';

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Generate sitemap.xml
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

// Generate the root URL with x-default
sitemap += `  <url>\n    <loc>${baseUrl}/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;

languagesList.forEach(lang => {
    toolsList.forEach(tool => {
        const route = tool.path ? `/${tool.path}` : '';
        const url = `${baseUrl}/${lang}${route}`;
        sitemap += `  <url>\n    <loc>${url}</loc>\n`;
        sitemap += `    <changefreq>daily</changefreq>\n`;
        sitemap += `    <priority>${tool.path === '' ? '1.0' : '0.9'}</priority>\n`;
        // Add hreflang tags for all languages
        languagesList.forEach(altLang => {
            const altUrl = `${baseUrl}/${altLang}${route}`;
            sitemap += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${altUrl}"/>\n`;
        });
        // Add x-default
        const defaultUrl = `${baseUrl}/en${route}`;
        sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}"/>\n`;
        sitemap += `  </url>\n`;
    });
});

sitemap += `</urlset>`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log('✅ Sitemap.xml generated successfully!');

// 2. Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /

# B2A Protocols (LLM Web Crawlers)
Allow: /*/llms.txt
Allow: /*/llms-full.txt
Allow: /llms.txt
Allow: /llms-full.txt

Sitemap: ${baseUrl}/sitemap.xml
`;

fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
console.log('✅ Robots.txt generated successfully!');
