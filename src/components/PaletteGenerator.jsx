import React, { useEffect, useState } from 'react';
import { extractSmartPalette } from '../utils/colorExtractor';
import { rgbToHex, getContrastTextColor } from '../utils/colorUtils';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

export const PaletteGenerator = ({ t, imageSrc, onColorSelect }) => {
    const [palette, setPalette] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!imageSrc) {
            setPalette([]);
            return;
        }

        setLoading(true);
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        
        img.onload = () => {
            // Give browser a frame to render loading state
            setTimeout(() => {
                try {
                    const colors = extractSmartPalette(img, 6, 60);
                    setPalette(colors);
                } catch (e) {
                    console.error("Color extraction failed", e);
                } finally {
                    setLoading(false);
                }
            }, 50);
        };
        img.src = imageSrc;
    }, [imageSrc]);

    const handleCopy = (r, g, b) => {
        const hex = rgbToHex(r, g, b).toUpperCase();
        navigator.clipboard.writeText(hex);
        toast.success(`Copied ${hex}`);
        if (onColorSelect) {
            onColorSelect({ r, g, b });
        }
    };

    return (
        <div className="bg-transparent rounded-3xl p-6 border-0">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">{t?.generatedPalette || 'Generated Palette'}</h3>
            
            <div className="flex rounded-2xl overflow-hidden h-32 w-full shadow-inner bg-gray-50 dark:bg-gray-900/50">
                <AnimatePresence>
                    {!imageSrc && !loading && (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                            {t?.uploadPrompt || 'Upload an image to generate palette'}
                        </div>
                    )}
                    {loading && (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    )}
                    {!loading && palette.map((color, idx) => {
                        const hex = rgbToHex(color.r, color.g, color.b).toUpperCase();
                        const textColor = getContrastTextColor(color.r, color.g, color.b);
                        
                        return (
                            <motion.div
                                key={idx + hex}
                                initial={{ opacity: 0, flex: 0 }}
                                animate={{ opacity: 1, flex: 1 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                onClick={() => handleCopy(color.r, color.g, color.b)}
                                className="h-full cursor-pointer group relative hover:flex-[1.5] transition-all duration-300 ease-out flex items-end justify-center pb-4"
                                style={{ backgroundColor: hex, color: textColor }}
                            >
                                <motion.span 
                                    initial={{ opacity: 0, y: 10 }}
                                    whileHover={{ opacity: 1, y: 0 }}
                                    className="font-mono text-sm font-bold opacity-0 group-hover:opacity-100 transition-all drop-shadow-md"
                                >
                                    {hex}
                                </motion.span>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};
