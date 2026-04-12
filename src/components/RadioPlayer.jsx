import { useState } from 'react';
import { Headphones, X, ChevronDown, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RadioPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      <AnimatePresence>
        {!isExpanded && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(true)}
            className="group relative flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full shadow-2xl shadow-primary-500/40 border-4 border-white dark:border-slate-800"
          >
            {/* Contenedor animado de ondas */}
            <div className="absolute inset-0 rounded-full border-2 border-primary-400 animate-ping opacity-75" />
            
            <Headphones size={28} className="group-hover:animate-bounce" />
            
            {/* Tooltip */}
            <span className="absolute left-full ml-4 px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Radio Estudio UNAM
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            className="glass-card shadow-2xl overflow-hidden flex flex-col w-[340px] sm:w-[380px] origin-bottom-left border-2 border-primary-500/20"
          >
            {/* Encabezado del Reproductor */}
            <div className="bg-gradient-to-r from-primary-600 to-indigo-600 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2 font-bold">
                <Music size={18} className="animate-pulse" />
                <span>IAmequedo Music</span>
              </div>
              <button 
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors text-white"
                title="Minimizar radio"
              >
                <ChevronDown size={20} />
              </button>
            </div>

            {/* Contenedor del iFrame de YouTube */}
            <div className="bg-slate-900 w-full aspect-video relative">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/videoseries?list=PL14kE7u6TXcZuUvhwXRTtU-7StwxDira_" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </div>

            <div className="bg-white dark:bg-slate-800 p-3 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
              Aprende historia con ritmo. ¡Dale Play!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
