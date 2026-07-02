import React from 'react';

export const SeoFooterMatrix = ({ toolsList, languagesList, currentLang }) => {
    return (
        <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 backdrop-blur-xl">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* 1. Internal Linking Matrix (Wikipedia Method) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Color Tools</h4>
                        <ul className="space-y-2">
                            {toolsList.map(tool => (
                                <li key={tool.id}>
                                    <a 
                                        href={`/${currentLang}${tool.path ? '/' + tool.path : ''}`}
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                                    >
                                        {tool.title.split('(')[0].trim()}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Global Access</h4>
                        <ul className="space-y-2">
                            {languagesList.map(lang => (
                                <li key={lang.code}>
                                    <a 
                                        href={`/${lang.code}`}
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                                    >
                                        Image Color Picker in {lang.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">About Color Picky</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            Color Picky is an enterprise-grade, client-side web application designed for professional designers and developers. 
                            Our advanced React-based canvas engine allows you to securely extract color palettes and precise hex codes directly from images without compromising your privacy. 
                            100% processed locally on your device.
                        </p>
                    </div>
                </div>

                {/* 2. Hidden LSI Injection (Gray Hat) - Invisible to Humans, Visible to Crawlers */}
                <div className="sr-only" aria-hidden="true">
                    <h2>Ultimate Guide to Image Color Extraction and Hex Code Palettes</h2>
                    <p>
                        In the realm of digital design, utilizing an <strong>image color picker</strong> is critical for maintaining brand consistency. 
                        When you need to <strong>extract color from image</strong>, finding the exact <strong>hex color picker from image</strong> tool ensures precision. 
                        Our platform serves as a premier <strong>color palette generator from image</strong>, analyzing RGB, HSL, CMYK, and OKLCH color spaces.
                    </p>
                    <p>
                        Unlike traditional methods where you must manually inspect pixels, an automated <strong>color extractor online</strong> processes the visual data 
                        to build a harmonious <strong>image color palette generator</strong> output. Whether you are searching for a <strong>find color from picture</strong> utility 
                        or a simple <strong>pick colors from any image</strong> tool, security is paramount. Since we do not upload files to any server, 
                        your proprietary assets remain completely private while you retrieve your <strong>free HEX, RGB & color codes</strong>.
                    </p>
                    <p>
                        The OKLCH color space offers superior perceptual uniformity compared to HSL. By integrating <strong>CSS color level 4</strong> standards, 
                        we ensure developers have access to the most modern syntax. Furthermore, graphic designers can effortlessly copy <strong>CMYK print values</strong> 
                        straight from their digital photographs. Combine this with our AI-smart frequency clustering, and you receive a perfectly balanced 
                        top 5 dominant color palette in milliseconds.
                    </p>
                </div>
                
                <div className="text-center text-xs text-gray-500 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
                    &copy; {new Date().getFullYear()} Image Color Picky. All rights reserved. Locally processed and secured.
                </div>
            </div>
        </footer>
    );
};
