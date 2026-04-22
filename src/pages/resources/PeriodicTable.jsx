import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { elements } from '../../data/periodicTableData';
import { X, ArrowLeft, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const categoryColors = {
  "no metal": "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700",
  "gas noble": "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-700",
  "metal alcalino": "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-700",
  "alcalinotérreo": "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-700",
  "metaloide": "bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-900/40 dark:text-teal-300 dark:border-teal-700",
  "halógeno": "bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-900/40 dark:text-cyan-300 dark:border-cyan-700",
  "metal del bloque p": "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700",
  "metal de transición": "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-900/40 dark:text-rose-300 dark:border-rose-700",
  "lantánido": "bg-pink-100 text-pink-800 border-pink-300 dark:bg-pink-900/40 dark:text-pink-300 dark:border-pink-700",
  "actínido": "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300 dark:bg-fuchsia-900/40 dark:text-fuchsia-300 dark:border-fuchsia-700",
};

export default function PeriodicTable() {
  const [selectedElement, setSelectedElement] = useState(null);

  // Helper to determine grid positions
  const getGridStyle = (el) => {
    let col = el.group;
    let row = el.period;

    // Fix Lanthanides
    if (el.num >= 57 && el.num <= 71) {
      row = 9;
      col = el.num - 57 + 4; // Starts at column 4
    }
    // Fix Actinides
    else if (el.num >= 89 && el.num <= 103) {
      row = 10;
      col = el.num - 89 + 4;
    }

    return { gridColumn: col, gridRow: row };
  };

  return (
    <div className="pt-6 pb-12">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/recursos" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100">Tabla Periódica</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Selecciona un elemento para ver su información</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        
        {/* Contenedor Principal de la Tabla */}
        <div className="flex-1 overflow-x-auto pb-6 custom-scrollbar">
          <div className="min-w-[900px] grid grid-cols-[repeat(18,minmax(0,1fr))] gap-1 md:gap-1.5 auto-rows-[45px] md:auto-rows-[55px]">
            {elements.map((el) => {
              const style = getGridStyle(el);
              const colorClass = categoryColors[el.category] || "bg-slate-100 text-slate-800 border-slate-300";
              const isSelected = selectedElement?.num === el.num;

              return (
                <motion.button
                  key={el.num}
                  style={style}
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedElement(el)}
                  className={`
                    relative flex flex-col items-center justify-center border rounded-md shadow-sm transition-shadow
                    ${colorClass}
                    ${isSelected ? 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-slate-900 shadow-lg z-10' : 'hover:shadow-md'}
                  `}
                >
                  <span className="absolute top-0.5 left-1 text-[9px] md:text-[10px] font-bold opacity-70">{el.num}</span>
                  <span className="text-sm md:text-lg font-black leading-none mt-1">{el.sym}</span>
                  <span className="text-[8px] md:text-[9px] truncate w-full px-0.5 leading-tight opacity-90">{el.name}</span>
                </motion.button>
              );
            })}

            {/* Huecos visuales para lantanidos y actinidos en la tabla principal */}
            <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-md flex items-center justify-center text-xs text-slate-400 dark:text-slate-500 font-bold" style={{ gridColumn: 3, gridRow: 6 }}>57-71</div>
            <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-md flex items-center justify-center text-xs text-slate-400 dark:text-slate-500 font-bold" style={{ gridColumn: 3, gridRow: 7 }}>89-103</div>
          </div>

          {/* Leyenda Visual */}
          <div className="mt-8 flex flex-wrap gap-3 max-w-[900px]">
            {Object.entries(categoryColors).map(([cat, colors]) => (
              <div key={cat} className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 capitalize">
                <div className={`w-3 h-3 rounded-full border ${colors}`}></div>
                {cat}
              </div>
            ))}
          </div>
        </div>

        {/* Panel Lateral de Información */}
        <AnimatePresence mode="wait">
          {selectedElement ? (
            <motion.div
              key="panel"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full xl:w-80 shrink-0"
            >
              <div className={`glass-card p-6 border-t-4 ${categoryColors[selectedElement.category].split(' ')[0]}`}>
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center border shadow-sm ${categoryColors[selectedElement.category]}`}>
                    <span className="text-sm font-bold opacity-70 absolute top-1 left-1.5">{selectedElement.num}</span>
                    <span className="text-4xl font-black">{selectedElement.sym}</span>
                  </div>
                  <button onClick={() => setSelectedElement(null)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400">
                    <X size={20} />
                  </button>
                </div>
                
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">{selectedElement.name}</h2>
                <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-6">
                  {selectedElement.category}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Número Atómico (Z)</span>
                    <span className="text-slate-900 dark:text-slate-100 font-bold">{selectedElement.num}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Masa Atómica</span>
                    <span className="text-slate-900 dark:text-slate-100 font-bold">{selectedElement.mass} u</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Grupo</span>
                    <span className="text-slate-900 dark:text-slate-100 font-bold">{selectedElement.group}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Periodo</span>
                    <span className="text-slate-900 dark:text-slate-100 font-bold">{selectedElement.period}</span>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex items-start gap-3 border border-blue-100 dark:border-blue-800">
                  <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />
                  <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                    <strong>Tip para el examen:</strong> Los elementos del mismo <strong>Grupo</strong> (columna) tienen propiedades químicas similares. El <strong>Periodo</strong> (fila) indica el número de capas electrónicas.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full xl:w-80 shrink-0 glass-card p-8 flex flex-col items-center justify-center text-center border-dashed border-2 border-slate-200 dark:border-slate-700 min-h-[400px]"
            >
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-300 dark:text-slate-600">
                <Info size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">Modo Interactivo</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Toca cualquier elemento de la tabla para explorar su información, familia y propiedades clave.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
