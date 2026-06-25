import { useState, useCallback, useRef } from 'react';
import { rgbToHex } from '../utils/colorUtils';

export const useColorPicker = () => {
    const [pickedColor, setPickedColor] = useState({ r: 229, g: 231, b: 235 });
    const [isHovering, setIsHovering] = useState(false);
    const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
    
    const canvasRef = useRef(null);
    const imgRef = useRef(null);
    const magnifierCanvasRef = useRef(null);

    const updateColorInfo = useCallback((r, g, b) => {
        setPickedColor({ r, g, b });
    }, []);

    const getPixelColor = useCallback((e) => {
        if (!imgRef.current || !canvasRef.current) return null;
        
        const img = imgRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        
        // Exact Bounding Box of the Image Element (no letterboxing)
        const rect = img.getBoundingClientRect();
        
        // Ensure hover is strictly inside the actual image pixels
        if (e.clientX < rect.left || e.clientX > rect.right || 
            e.clientY < rect.top || e.clientY > rect.bottom) {
            return null;
        }

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        let x = (e.clientX - rect.left) * scaleX;
        let y = (e.clientY - rect.top) * scaleY;

        x = Math.floor(Math.max(0, Math.min(x, canvas.width - 1)));
        y = Math.floor(Math.max(0, Math.min(y, canvas.height - 1)));

        return { x, y, pixel: ctx.getImageData(x, y, 1, 1).data };
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (!imgRef.current || !magnifierCanvasRef.current || !canvasRef.current) return;
        
        // Always track magnifier position in DOM relative to container
        const containerRect = imgRef.current.parentElement.getBoundingClientRect();
        setMagnifierPos({ 
            x: e.clientX - containerRect.left, 
            y: e.clientY - containerRect.top 
        });

        const colorData = getPixelColor(e);
        if (!colorData) {
            setIsHovering(false);
            return;
        }

        setIsHovering(true);
        const { x, y, pixel } = colorData;
        const canvas = canvasRef.current;
        const magCanvas = magnifierCanvasRef.current;
        const magCtx = magCanvas.getContext('2d', { willReadFrequently: true });

        // Draw zoomed area (high zoom for exact pixel precision)
        const zoom = 8;
        const sx = x - (magCanvas.width / 2) / zoom;
        const sy = y - (magCanvas.height / 2) / zoom;
        const sWidth = magCanvas.width / zoom;
        const sHeight = magCanvas.height / zoom;

        // Pixelated rendering
        magCtx.imageSmoothingEnabled = false;
        magCtx.clearRect(0, 0, magCanvas.width, magCanvas.height);
        magCtx.drawImage(canvas, sx, sy, sWidth, sHeight, 0, 0, magCanvas.width, magCanvas.height);

        updateColorInfo(pixel[0], pixel[1], pixel[2]);
    }, [getPixelColor, updateColorInfo]);

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false);
    }, []);

    const handleClick = useCallback((e) => {
        const colorData = getPixelColor(e);
        if (colorData) {
            const pixel = colorData.pixel;
            updateColorInfo(pixel[0], pixel[1], pixel[2]);
            return {
                hex: rgbToHex(pixel[0], pixel[1], pixel[2])
            };
        }
    }, [getPixelColor, updateColorInfo]);

    return {
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
    };
};
