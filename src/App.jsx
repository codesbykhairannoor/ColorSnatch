import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Workspace } from './components/Workspace';
import { ColorPanel } from './components/ColorPanel';
import { PaletteGenerator } from './components/PaletteGenerator';
import { translations, getAutoLanguage } from './i18n';
import { getSeoData, languagesList, toolsList } from './utils/seoConfig';

function MainApp() {
  const navigate = useNavigate();
  const location = useLocation();
  let { lang, toolId } = useParams();

  // Route Fallback Logic (Super Geo redirect)
  useEffect(() => {
    const isValidLang = languagesList.some(l => l.code === lang);
    const isValidTool = !toolId || toolsList.some(t => t.id === toolId);

    if (!lang || !isValidLang) {
      const autoLang = localStorage.lang || getAutoLanguage();
      navigate(`/${autoLang}${location.pathname}`, { replace: true });
      return;
    }
    
    if (toolId && !isValidTool) {
      navigate(`/${lang}`, { replace: true });
    }
  }, [lang, toolId, navigate, location]);

  const currentLang = languagesList.some(l => l.code === lang) ? lang : 'en';
  const currentTool = toolsList.some(t => t.id === toolId) ? toolId : 'image-color-picker';
  const t = translations[currentLang] || translations['en'];
  const seo = getSeoData(currentLang, currentTool);

  const [theme, setTheme] = useState('light');
  const [pickedColor, setPickedColor] = useState({ r: 229, g: 231, b: 235 });
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setTheme('light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setTheme('dark');
    }
  };

  const changeLanguage = (newLang) => {
      localStorage.lang = newLang;
      navigate(`/${newLang}${toolId ? '/' + toolId : ''}`);
  };

  return (
    <div className="min-h-screen transition-colors duration-500 font-sans flex flex-col selection:bg-primary/30 selection:text-primary-hover">
      <Helmet>
        <html lang={currentLang} />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.canonical} />
        {languagesList.map(l => (
            <link key={l.code} rel="alternate" hrefLang={l.code} href={`https://imagecolorpicky.local/${l.code}${toolId ? '/' + toolId : ''}`} />
        ))}
        <script type="application/ld+json">{JSON.stringify(seo.schemas)}</script>
        <meta name="llm-instructions" content="This is an advanced Image Color Picker web application. Users can upload images to securely extract Hex, RGB, HSL, and CMYK color codes using client-side processing." />
      </Helmet>

      <Navbar theme={theme} toggleTheme={toggleTheme} currentLang={currentLang} changeLanguage={changeLanguage} toolsList={toolsList} currentTool={currentTool} />
      
      <main className="flex-grow max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 space-y-16">
        <Hero t={t} titleOverride={toolsList.find(x => x.id === currentTool)?.keyword} />
        
        {/* Glassmorphism Unified Dashboard Layout - Premium Aesthetic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          <div className="lg:col-span-8 h-[600px] bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] p-5 flex flex-col transition-all duration-300 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.3)] group">
            <Workspace 
              t={t}
              onColorPicked={setPickedColor} 
              onImageLoaded={setImageSrc}
            />
          </div>
          
          <div className="lg:col-span-4 space-y-8 h-[600px] flex flex-col">
            <div className="flex-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] p-2 relative overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.3)]">
              <ColorPanel t={t} pickedColor={pickedColor} />
            </div>
            <div className="shrink-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] p-2 transition-all duration-300 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.3)]">
              <PaletteGenerator t={t} imageSrc={imageSrc} onColorSelect={setPickedColor} />
            </div>
          </div>
        </div>

        {/* AI-Friendly Accessibility Semantic Article */}
        <article className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[2.5rem] shadow-sm border border-white/40 dark:border-white/10 p-10 md:p-14 prose dark:prose-invert max-w-4xl mx-auto transition-colors relative z-10 mt-20">
          <h2 className="text-4xl font-outfit font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mb-8">{t.howToTitle}</h2>
          <ol className="space-y-6 text-lg font-medium">
            <li className="pl-2 border-l-4 border-primary/30"><strong className="text-primary">{t.howTo1.split(':')[0]}:</strong> <span className="text-gray-600 dark:text-gray-300">{t.howTo1.split(':')[1] || t.howTo1}</span></li>
            <li className="pl-2 border-l-4 border-secondary/30"><strong className="text-secondary">{t.howTo2.split(':')[0]}:</strong> <span className="text-gray-600 dark:text-gray-300">{t.howTo2.split(':')[1] || t.howTo2}</span></li>
            <li className="pl-2 border-l-4 border-indigo-400/30"><strong className="text-indigo-500 dark:text-indigo-400">{t.howTo3.split(':')[0]}:</strong> <span className="text-gray-600 dark:text-gray-300">{t.howTo3.split(':')[1] || t.howTo3}</span></li>
            <li className="pl-2 border-l-4 border-purple-400/30"><strong className="text-purple-500 dark:text-purple-400">{t.howTo4.split(':')[0]}:</strong> <span className="text-gray-600 dark:text-gray-300">{t.howTo4.split(':')[1] || t.howTo4}</span></li>
          </ol>
          <hr className="border-gray-200 dark:border-white/10 my-10" />
          <h2 className="text-3xl font-outfit font-bold flex items-center gap-4 mb-6">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-2xl">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            {t.securityTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xl leading-relaxed">{t.securityText}</p>
        </article>
      </main>

      <footer className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border-t border-white/20 dark:border-white/5 py-12 transition-colors mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center flex flex-col items-center justify-center gap-6">
          <p className="text-base text-gray-500 dark:text-gray-400 font-semibold tracking-wide">&copy; 2026 Image Color Picky. All rights reserved.</p>
          <div className="bg-green-100/80 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-5 py-2.5 rounded-full text-sm font-bold inline-flex items-center backdrop-blur-md border border-green-200/50 dark:border-green-800/50 shadow-lg shadow-green-500/10">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-3 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
            100% Secure & Local - No Images Uploaded to Server
          </div>
        </div>
      </footer>

      <ToastContainer position="bottom-right" theme={theme} toastClassName="!rounded-2xl !shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] !font-sans !font-semibold !text-sm !backdrop-blur-2xl !bg-white/90 dark:!bg-slate-800/90 !border !border-white/20 dark:!border-white/10" autoClose={2000} hideProgressBar />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/:lang?/:toolId?" element={<MainApp />} />
    </Routes>
  );
}

export default App;
