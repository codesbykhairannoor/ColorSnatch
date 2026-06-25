import React from 'react';
import { motion } from 'framer-motion';

export const Hero = ({ t, titleOverride }) => {
    // If we have a programmatic SEO title override, we merge it with the UI layout
    // E.g. "Extract Color" -> "Extract Color Picker" or just use the translated layout
    
    const displayTitle = titleOverride || t?.title || "God-Tier Color Picker";

    return (
        <div className="text-center space-y-6 pt-8 pb-10 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: "easeOut", type: "spring", bounce: 0.4 }}
                className="relative inline-block"
            >
                <div className="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-primary/20 via-purple-500/20 to-secondary/20 blur-3xl rounded-full opacity-50 dark:opacity-70 animate-pulse-slow"></div>
                <h1 className="text-5xl md:text-7xl font-outfit font-black tracking-tight text-gray-900 dark:text-white mb-6 drop-shadow-sm relative z-10 leading-[1.1]">
                    {displayTitle.split(' ').map((word, i, arr) => 
                        i === arr.length - 1 || i === arr.length - 2 ? 
                        <span key={i} className="bg-clip-text text-transparent bg-gradient-to-br from-primary via-indigo-500 to-secondary animate-gradient-x inline-block"> {word}</span> : 
                        word + " "
                    )}
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium relative z-10">
                    {t?.subtitle || "Upload any photo, pinpoint exact colors with our loupe, and instantly generate palettes."}
                </p>
            </motion.div>
        </div>
    );
};
