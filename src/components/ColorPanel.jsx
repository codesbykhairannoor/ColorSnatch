import React from 'react';
import { Copy } from 'lucide-react';
import { rgbToHex, rgbToHsl, rgbToCmyk } from '../utils/colorUtils';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

export const ColorPanel = ({ t, pickedColor }) => {
    const hex = rgbToHex(pickedColor.r, pickedColor.g, pickedColor.b).toUpperCase();
    const hslObj = rgbToHsl(pickedColor.r, pickedColor.g, pickedColor.b);
    const hslStr = `hsl(${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%)`;
    const rgbStr = `rgb(${pickedColor.r}, ${pickedColor.g}, ${pickedColor.b})`;
    const cmykObj = rgbToCmyk(pickedColor.r, pickedColor.g, pickedColor.b);
    const cmykStr = `cmyk(${cmykObj.c}%, ${cmykObj.m}%, ${cmykObj.y}%, ${cmykObj.k}%)`;

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.success(`Copied ${text}`);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-transparent rounded-3xl p-6 flex flex-col h-full border-0"
        >
            <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">{t?.selectedColor || 'Selected Color'}</h3>
            
            <div className="flex items-center gap-6 mb-8">
                <motion.div 
                    layoutId="colorPreview"
                    className="w-24 h-24 rounded-2xl shadow-inner border border-gray-100 dark:border-gray-700 flex-shrink-0" 
                    style={{ backgroundColor: hex }}
                    animate={{ backgroundColor: hex }}
                    transition={{ duration: 0.2 }}
                />
                <div className="flex-grow">
                    <label className="block text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">HEX</label>
                    <div className="flex relative group">
                        <input 
                            type="text" 
                            value={hex} 
                            readOnly 
                            onClick={() => handleCopy(hex)}
                            className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl py-3 px-4 text-lg font-mono font-medium focus:outline-none dark:text-white cursor-pointer hover:border-primary transition-colors"
                        />
                        <button 
                            onClick={() => handleCopy(hex)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-primary transition-colors" 
                            title="Copy HEX"
                        >
                            <Copy className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <FormatRow label="RGB" value={rgbStr} onCopy={handleCopy} />
                <FormatRow label="HSL" value={hslStr} onCopy={handleCopy} />
                <FormatRow label="CMYK" value={cmykStr} onCopy={handleCopy} />
            </div>
        </motion.div>
    );
};

const FormatRow = ({ label, value, onCopy }) => (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group cursor-pointer" onClick={() => onCopy(value)}>
        <span className="text-sm font-semibold text-gray-400 w-16">{label}</span>
        <span className="text-sm font-mono text-gray-700 dark:text-gray-200">{value}</span>
        <Copy className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
    </div>
);
