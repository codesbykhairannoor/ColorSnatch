import React, { useState, useEffect } from 'react';
import { useColorPicker } from '../hooks/useColorPicker';
import { UploadCloud, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Workspace = ({ t, onColorPicked, onImageLoaded }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    
    const {
        imgRef,
        canvasRef,
        magnifierCanvasRef,
        pickedColor,
        isHovering,
        magnifierPos,
        handleMouseMove,
        handleMouseLeave,
        handleClick,
        updateColorInfo
    } = useColorPicker();

    useEffect(() => {
        onColorPicked(pickedColor);
    }, [pickedColor, onColorPicked]);

    const handleFile = (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            setImageSrc(e.target.result);
            onImageLoaded(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handlePaste = (e) => {
        if (e.clipboardData && e.clipboardData.items) {
            for (let i = 0; i < e.clipboardData.items.length; i++) {
                if (e.clipboardData.items[i].type.indexOf('image') !== -1) {
                    handleFile(e.clipboardData.items[i].getAsFile());
                    break;
                }
            }
        }
    };

    useEffect(() => {
        window.addEventListener('paste', handlePaste);
        return () => window.removeEventListener('paste', handlePaste);
    }, []);

    const onImageLoad = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const img = e.target;
        
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
        
        const centerX = Math.floor(img.naturalWidth / 2);
        const centerY = Math.floor(img.naturalHeight / 2);
        const pixel = ctx.getImageData(centerX, centerY, 1, 1).data;
        updateColorInfo(pixel[0], pixel[1], pixel[2]);
    };

    return (
        <div className="relative w-full h-[500px] bg-transparent rounded-3xl overflow-hidden flex items-center justify-center group border-0">
            <AnimatePresence>
                {!imageSrc ? (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className={`absolute inset-0 flex flex-col items-center justify-center p-8 m-4 rounded-[2rem] border-2 border-dashed transition-all duration-300
                        ${isDragging ? 'border-primary bg-primary/10 dark:bg-primary/20 scale-[0.98]' : 'border-gray-300/50 dark:border-gray-600/50 hover:bg-white/40 dark:hover:bg-gray-800/40 hover:border-primary/50'}`}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                    >
                        <div className="bg-primary/10 p-4 rounded-full mb-4">
                            <UploadCloud className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{t?.dragDrop}</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm text-center">{t?.orPaste}</p>
                        
                        <label className="cursor-pointer bg-primary text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-primary/30 hover:bg-primary-hover transition-all hover:-translate-y-1">
                            {t?.browse}
                            <input 
                                type="file" 
                                className="hidden" 
                                accept="image/png, image/jpeg, image/webp" 
                                onChange={(e) => handleFile(e.target.files[0])}
                            />
                        </label>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        className={`relative w-full h-full bg-gray-100 dark:bg-gray-900 overflow-hidden flex items-center justify-center ${isHovering ? 'cursor-none' : 'cursor-crosshair'}`}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleClick}
                    >
                        <img 
                            ref={imgRef}
                            src={imageSrc} 
                            alt="Workspace" 
                            style={{ maxWidth: '100%', maxHeight: '100%', pointerEvents: 'none' }}
                            onLoad={onImageLoad} 
                            crossOrigin="Anonymous"
                        />
                        <canvas 
                            ref={canvasRef} 
                            className="hidden"
                        />
                        
                        {/* Perfect Magnifier as Custom Cursor */}
                        {isHovering && (
                            <div 
                                className="absolute pointer-events-none z-50 w-32 h-32 rounded-full border-[6px] border-white dark:border-gray-800 shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                                style={{ 
                                    left: magnifierPos.x, 
                                    top: magnifierPos.y,
                                    willChange: 'left, top'
                                }}
                            >
                                <canvas ref={magnifierCanvasRef} className="w-full h-full object-cover" width="100" height="100" />
                                {/* Crosshair Center Reticle */}
                                <div className="absolute inset-0 flex items-center justify-center mix-blend-difference text-white">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                    <div className="absolute w-full h-[1px] bg-white/50"></div>
                                    <div className="absolute h-full w-[1px] bg-white/50"></div>
                                </div>
                            </div>
                        )}

                        <div className="absolute top-4 right-4 flex gap-2">
                            <button 
                                onClick={(e) => { e.stopPropagation(); setImageSrc(null); onImageLoaded(null); }}
                                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur text-red-500 p-2 rounded-full shadow hover:bg-red-50 dark:hover:bg-red-500/20 transition-colors cursor-pointer pointer-events-auto"
                                title="Remove Image"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
