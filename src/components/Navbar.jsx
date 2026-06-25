import React, { useState, useRef, useEffect } from 'react';
import { Palette, Sun, Moon, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Navbar = ({ theme, toggleTheme, currentLang, changeLanguage, toolsList, currentTool }) => {
    const [isToolsOpen, setIsToolsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsToolsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 transition-colors shadow-sm">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <Link to={`/${currentLang}`} className="flex items-center gap-3 cursor-pointer group">
                        <div className="bg-gradient-to-br from-primary to-purple-600 p-2.5 rounded-2xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                            <Palette className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-extrabold text-2xl tracking-tight text-gray-900 dark:text-white">
                            Color Picky
                        </span>
                    </Link>
                    
                    <div className="flex items-center space-x-6">
                        {/* SEO Tools Dropdown */}
                        <div className="relative hidden md:block" ref={dropdownRef}>
                            <button 
                                onClick={() => setIsToolsOpen(!isToolsOpen)}
                                className="flex items-center gap-1.5 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                            >
                                {toolsList.find(t => t.id === currentTool)?.keyword || 'Tools'}
                                <ChevronDown className={`w-4 h-4 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            <AnimatePresence>
                                {isToolsOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 mt-4 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
                                    >
                                        <div className="py-2">
                                            {toolsList.map(tool => (
                                                <Link 
                                                    key={tool.id} 
                                                    to={`/${currentLang}${tool.path ? '/' + tool.path : ''}`}
                                                    onClick={() => setIsToolsOpen(false)}
                                                    className={`block px-5 py-3 text-sm font-medium transition-colors ${currentTool === tool.id ? 'bg-primary/5 text-primary border-l-2 border-primary' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                                >
                                                    {tool.keyword}
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden md:block"></div>

                        <select 
                            value={currentLang}
                            onChange={(e) => changeLanguage(e.target.value)}
                            className="bg-gray-50 dark:bg-gray-800 text-sm font-bold border border-gray-200 dark:border-gray-700 rounded-xl py-2 px-4 focus:ring-2 focus:ring-primary focus:border-transparent dark:text-gray-200 outline-none transition-all cursor-pointer shadow-sm hover:border-gray-300 dark:hover:border-gray-600 appearance-none"
                        >
                            <option value="en">English</option>
                            <option value="id">Indonesia</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                            <option value="de">Deutsch</option>
                            <option value="ja">日本語</option>
                            <option value="zh">中文</option>
                        </select>
                        
                        <button 
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all shadow-sm"
                            aria-label="Toggle Dark Mode"
                        >
                            <motion.div
                                initial={false}
                                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                            </motion.div>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
