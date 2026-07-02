import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Hardcoded for the script to avoid complex ESM/JSX imports
const toolsList = [
    {
        id: 'image-color-picker',
        path: '',
        title: 'Pick Colors from Any Image – 100% Private HEX, RGB, OKLCH',
        description: 'Upload an image to pick colors instantly. Get HEX, RGB, HSL and OKLCH codes securely—no uploads, no signup required. The ultimate image color picker.',
        keyword: 'Image Color Picker'
    },
    {
        id: 'hex-color-picker-from-image',
        path: 'hex-color-picker-from-image',
        title: 'Color Picker from Image & Hex Color Picker (AI-Smart)',
        description: 'Create custom color palettes from any image with our smart color picker tool. Simply upload an image and extract exact Hex codes securely.',
        keyword: 'Hex Color Picker'
    },
    {
        id: 'extract-color-from-image',
        path: 'extract-color-from-image',
        title: 'Extract palette from image - AI Generator Online',
        description: 'Easily extract colors from any image online. Analyze pixels and instantly pull the exact color values directly in your browser. 100% private extraction.',
        keyword: 'Extract Color'
    },
    {
        id: 'color-palette-generator',
        path: 'color-palette-generator',
        title: 'Color Palette Generator From Image (No Ads & Private)',
        description: 'Generate a color palette from any image in seconds. Upload a photo, extract dominant colors, and use your palette instantly without ads or server uploads.',
        keyword: 'Palette Generator'
    }
];

const languagesList = [
    { code: 'en', name: 'English' },
    { code: 'id', name: 'Indonesia' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ja', name: '日本語' },
    { code: 'zh', name: '中文' }
];

const publicDir = path.join(__dirname, '..', 'public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

const baseUrl = 'https://imagecolorpicky.local';

// Generate llms.txt and llms-full.txt for each language
languagesList.forEach(lang => {
    let markdown = `# Image Color Picker Online\n\n`;
    markdown += `> The most advanced, 100% secure, client-side tool to extract HEX, RGB, HSL, CMYK, and OKLCH colors directly from any image. No server uploads. AI-powered dominant color palette generation.\n\n`;
    
    markdown += `## Color Tools\n\n`;
    
    toolsList.forEach(tool => {
        const route = tool.path ? `/${tool.path}` : '';
        const url = `${baseUrl}/${lang.code}${route}`;
        // Strict B2A Syntax: - [Title](URL): Description
        markdown += `- [${tool.title}](${url}): ${tool.description}\n`;
    });

    const langDir = path.join(publicDir, lang.code);
    if (!fs.existsSync(langDir)) {
        fs.mkdirSync(langDir, { recursive: true });
    }

    // Write llms.txt
    fs.writeFileSync(path.join(langDir, 'llms.txt'), markdown);
    // Write llms-full.txt (In this simple SPA, they are the same content for now)
    fs.writeFileSync(path.join(langDir, 'llms-full.txt'), markdown);
    
    // For English, also write to the root of public/ so it's at domain.com/llms.txt
    if (lang.code === 'en') {
        fs.writeFileSync(path.join(publicDir, 'llms.txt'), markdown);
        fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), markdown);
    }
});

console.log('✅ B2A Protocol: llms.txt generated for all languages successfully!');
