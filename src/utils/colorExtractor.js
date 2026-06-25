/**
 * Smart Frequency-Based Color Extractor
 * specifically designed to handle flat UI elements and logos perfectly
 * without forcing 5 buckets like Median Cut algorithms.
 */

// Calculate Euclidean color distance (0 to 441)
const colorDistance = (c1, c2) => {
    const rMean = (c1.r + c2.r) / 2;
    const r = c1.r - c2.r;
    const g = c1.g - c2.g;
    const b = c1.b - c2.b;
    // Weighted Euclidean distance (better perceptual match for human eye)
    return Math.sqrt((((512 + rMean) * r * r) >> 8) + 4 * g * g + (((767 - rMean) * b * b) >> 8));
};

export const extractSmartPalette = (imgElement, maxColors = 6, distanceThreshold = 60) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Scale down for performance, preserving colors
    const maxSize = 150;
    let width = imgElement.naturalWidth || imgElement.width;
    let height = imgElement.naturalHeight || imgElement.height;
    
    if (width > maxSize || height > maxSize) {
        const ratio = Math.min(maxSize / width, maxSize / height);
        width = Math.floor(width * ratio);
        height = Math.floor(height * ratio);
    }
    
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(imgElement, 0, 0, width, height);
    
    const imageData = ctx.getImageData(0, 0, width, height).data;
    const colorCounts = new Map();
    
    // 1. Count Exact Frequencies (ignoring transparent pixels)
    for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];
        
        if (a < 128) continue; // Ignore mostly transparent pixels
        if (r > 250 && g > 250 && b > 250) continue; // Skip pure white background often found in jpegs (optional, but good for logos)
        
        // Discretize slightly to group practically identical pixels
        const rB = Math.round(r / 5) * 5;
        const gB = Math.round(g / 5) * 5;
        const bB = Math.round(b / 5) * 5;
        const key = `${rB},${gB},${bB}`;
        
        const count = colorCounts.get(key) || { r, g, b, count: 0 };
        count.count++;
        colorCounts.set(key, count);
    }
    
    // 2. Sort by frequency
    let sortedColors = Array.from(colorCounts.values()).sort((a, b) => b.count - a.count);
    
    // 3. Cluster similar colors to remove anti-aliasing variations
    const clusteredColors = [];
    
    for (const color of sortedColors) {
        let foundCluster = false;
        for (const cluster of clusteredColors) {
            if (colorDistance(color, cluster) < distanceThreshold) {
                cluster.count += color.count;
                // Weight the color by frequency
                cluster.r = Math.round((cluster.r * cluster.count + color.r * color.count) / (cluster.count + color.count));
                cluster.g = Math.round((cluster.g * cluster.count + color.g * color.count) / (cluster.count + color.count));
                cluster.b = Math.round((cluster.b * cluster.count + color.b * color.count) / (cluster.count + color.count));
                foundCluster = true;
                break;
            }
        }
        if (!foundCluster) {
            clusteredColors.push({ ...color });
        }
    }
    
    // 4. Sort clusters by total count and take maxColors
    clusteredColors.sort((a, b) => b.count - a.count);
    
    // Only return clusters that constitute at least 1% of the non-transparent image if there are multiple,
    // or just return what we have to prevent 5 boxes for a 2-color image.
    const totalCount = clusteredColors.reduce((sum, c) => sum + c.count, 0);
    const significantColors = clusteredColors.filter(c => (c.count / totalCount) > 0.02);
    
    return (significantColors.length > 0 ? significantColors : clusteredColors).slice(0, maxColors).map(c => ({
        r: c.r, g: c.g, b: c.b
    }));
};
