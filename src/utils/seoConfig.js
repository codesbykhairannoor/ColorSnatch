export const toolsList = [
    {
        id: 'image-color-picker',
        path: '',
        title: 'Image Color Picker - Extract Hex, RGB, HSL from Image Online',
        description: 'Use our free Image Color Picker to extract color palettes, find hex colors from pictures, and get exact RGB/HSL codes. 100% secure.',
        keyword: 'Image Color Picker'
    },
    {
        id: 'hex-color-picker-from-image',
        path: 'hex-color-picker-from-image',
        title: 'Hex Color Picker from Image - Find Exact Hex Codes',
        description: 'Upload your picture to find specific hex color codes. Our hex color picker from image tool is fast, precise, and completely secure.',
        keyword: 'Hex Color Picker'
    },
    {
        id: 'extract-color-from-image',
        path: 'extract-color-from-image',
        title: 'Extract Color from Image - Best Color Extractor Online',
        description: 'Easily extract colors from any image online. Analyze pixels and instantly pull the exact color values directly in your browser.',
        keyword: 'Extract Color'
    },
    {
        id: 'color-palette-generator',
        path: 'color-palette-generator',
        title: 'Color Palette Generator from Image - AI Smart Extractor',
        description: 'Generate beautiful, accurate color palettes from images using our smart frequency-based extractor. Perfect for designers and artists.',
        keyword: 'Palette Generator'
    }
];

export const languagesList = [
    { code: 'en', name: 'English' },
    { code: 'id', name: 'Indonesia' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ja', name: '日本語' },
    { code: 'zh', name: '中文' }
];

export const getSeoData = (lang, toolId) => {
    const tool = toolsList.find(t => t.id === toolId) || toolsList[0];
    
    // In a real localized app, these meta titles would also be translated using the i18n dictionary.
    // For now, we mix the localized base title with the SEO keyword intent.
    
    return {
        title: tool.title,
        description: tool.description,
        canonical: `https://imagecolorpicky.local/${lang}${tool.path ? '/' + tool.path : ''}`,
        schema: {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": tool.title,
            "url": `https://imagecolorpicky.local/${lang}${tool.path ? '/' + tool.path : ''}`,
            "applicationCategory": "DesignApplication",
            "operatingSystem": "All",
            "description": tool.description
        }
    };
};
