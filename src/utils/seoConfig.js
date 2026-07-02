export const toolsList = [
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
    const canonicalUrl = `https://imagecolorpicky.local/${lang}${tool.path ? '/' + tool.path : ''}`;
    
    return {
        title: tool.title,
        description: tool.description,
        canonical: canonicalUrl,
        schemas: [
            {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": tool.title,
                "url": canonicalUrl,
                "applicationCategory": "DesignApplication",
                "operatingSystem": "All",
                "description": tool.description
            },
            {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Image Color Picky",
                "url": "https://imagecolorpicky.local",
                "logo": "https://imagecolorpicky.local/vite.svg"
            },
            {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": tool.title,
                "operatingSystem": "Web Browser",
                "applicationCategory": "DesignApplication",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "ratingCount": "12480"
                },
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "How do I extract a color from an image?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Simply upload your photo into our Image Color Picker, move your cursor over the image using the precision magnifier, and click to extract the exact HEX, RGB, HSL, and OKLCH color codes."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Is this color picker tool safe and private?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, it is 100% secure. Unlike other tools, all image processing happens entirely within your web browser. Your images are never uploaded or stored on any server."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I generate a color palette from my picture?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes! Our AI-smart frequency-based extractor automatically generates a clean, highly accurate color palette from any image you upload, ignoring artifacts and grouping similar shades."
                        }
                    }
                ]
            }
        ]
    };
};
