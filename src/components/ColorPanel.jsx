import React from 'react';
import { rgbToHex, rgbToHsl, rgbToCmyk, rgbToOklchStr } from '../utils/colorUtils';
import { toast } from 'react-toastify';
import { Copy } from 'lucide-react';

export const ColorPanel = ({ t, pickedColor }) => {
    const { r, g, b } = pickedColor;
    
    const hex = rgbToHex(r, g, b).toUpperCase();
    const hsl = rgbToHsl(r, g, b);
    const cmyk = rgbToCmyk(r, g, b);
    const oklch = rgbToOklchStr(r, g, b);

    const colorCodes = [
        { label: 'HEX', value: hex },
        { label: 'RGB', value: `rgb(${r}, ${g}, ${b})` },
        { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
        { label: 'CMYK', value: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` },
        { label: 'OKLCH', value: oklch }
    ];

    const handleCopy = (value, label) => {
        navigator.clipboard.writeText(value);
        toast.success(`Copied ${label} to clipboard!`);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700 h-full flex flex-col overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    {t?.selectedColor || 'Extracted Color Details'}
                </h3>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg border border-gray-100 dark:border-gray-800">
                {t?.clickToCopy || "💡 Tip: Click any code value below to instantly copy it."}
            </p>

            <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center gap-4 sm:gap-6">
                    <div 
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shadow-inner border border-gray-200 dark:border-gray-700 transition-colors duration-200 shrink-0"
                        style={{ backgroundColor: hex }}
                    ></div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-1 uppercase tracking-wider">HEX</p>
                        <div 
                            onClick={() => handleCopy(hex, 'HEX')}
                            className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 flex justify-between items-center cursor-pointer hover:border-primary hover:shadow-sm transition-all group"
                        >
                            <span className="font-mono font-bold text-gray-800 dark:text-gray-200 truncate">{hex}</span>
                            <Copy className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors shrink-0 ml-2" />
                        </div>
                    </div>
                </div>

                <div className="space-y-2 mt-2 pb-2">
                    {colorCodes.slice(1).map((code) => (
                        <div key={code.label} className="flex justify-between items-center group">
                            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 w-14 sm:w-16 uppercase tracking-wider shrink-0">
                                {code.label}
                            </span>
                            <div 
                                onClick={() => handleCopy(code.value, code.label)}
                                className="flex-1 flex items-center justify-end gap-2 text-right text-xs sm:text-sm font-mono font-medium text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50 py-1.5 px-2 rounded-lg cursor-pointer transition-colors"
                            >
                                <span className="truncate">{code.value}</span>
                                <Copy className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 group-hover:text-primary transition-colors shrink-0" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
