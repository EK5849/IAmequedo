import { useState } from 'react';
import { Headphones, X, ChevronDown, Music, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PLAYLISTS = [
  { id: 'PL14kE7u6TXcYTAFbYHt4ArMc2pyx6BVKI', name: 'Todas las materias (Mix)' },
  { id: 'PL14kE7u6TXcZuUvhwXRTtU-7StwxDira_', name: 'Historia de México' },
  { id: 'PL14kE7u6TXcbecJBrBsYimUcBBsk3n1S9', name: 'Español' },
  { id: 'PL14kE7u6TXcZ5dFhX1b0DkB6pNzi8d0kq', name: 'Matemáticas' },
];

export default function RadioPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePlaylist, setActivePlaylist] = useState(PLAYLISTS[0]);

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      {/* Botón Flotante Permanente */}
      <motion.button
        animate={{ scale: isExpanded ? 0 : 1, opacity: isExpanded ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isExpanded ? 'none' : 'auto' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(true)}
        className="absolute bottom-0 left-0 flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full shadow-2xl shadow-primary-500/40 border-4 border-white dark:border-slate-800"
      >
        <div className="absolute inset-0 rounded-full border-2 border-primary-400 animate-ping opacity-75" />
        <Headphones size={28} className="group-hover:animate-bounce" />
        <span className="absolute left-full ml-4 px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Radio Estudio UNAM
        </span>
      </motion.button>

      {/* Reproductor Animado */}
      <motion.div
        animate={{ 
          y: isExpanded ? 0 : 20, 
          opacity: isExpanded ? 1 : 0,
          scale: isExpanded ? 1 : 0.95
        }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isExpanded ? 'auto' : 'none' }}
        className="glass-card shadow-2xl overflow-hidden flex flex-col w-[340px] sm:w-[380px] origin-bottom-left border-2 border-primary-500/20 absolute bottom-0 left-0"
      >
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-primary-600 to-indigo-600 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2 font-bold">
            <Music size={18} className="animate-pulse" />
            <span>IAmequedo Music</span>
          </div>
          <div className="flex items-center gap-1">
            <a 
              href="https://www.youtube.com/@IAmequedomusic" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1 hover:bg-white/20 rounded-full transition-colors text-white mr-1"
              title="Ir al canal de YouTube"
            >
              <ExternalLink size={18} />
            </a>
            <button 
              onClick={() => setIsExpanded(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors text-white"
              title="Minimizar radio"
            >
              <ChevronDown size={20} />
            </button>
          </div>
        </div>

        {/* Selector de Materia */}
        <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-3">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 block uppercase tracking-wider">
            Selecciona una materia
          </label>
          <div className="relative">
            <select
              value={activePlaylist.id}
              onChange={(e) => {
                const playlist = PLAYLISTS.find(p => p.id === e.target.value);
                if (playlist) setActivePlaylist(playlist);
              }}
              className="w-full appearance-none bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white rounded-lg py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors cursor-pointer"
            >
              {PLAYLISTS.map(playlist => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
              <ChevronDown size={14} />
            </div>
          </div>
        </div>

        {/* Contenedor del iFrame */}
        <div className="bg-slate-900 w-full aspect-video relative">
          <iframe 
            key={activePlaylist.id}
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed/videoseries?list=${activePlaylist.id}`} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
            className="absolute inset-0"
          ></iframe>
        </div>

        <div className="bg-white dark:bg-slate-800 p-3 text-center text-xs text-slate-500 dark:text-slate-400 font-medium border-t border-slate-100 dark:border-slate-700/50">
          Aprende con ritmo. ¡Dale Play!
        </div>
      </motion.div>
    </div>
  );
}
