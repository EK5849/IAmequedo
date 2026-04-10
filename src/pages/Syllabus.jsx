import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { temarioA1 } from '../data/temario';
import { ChevronRight, ChevronDown, CheckCircle2, Circle } from 'lucide-react';

export default function Syllabus() {
  const [expandedMateria, setExpandedMateria] = useState(null);
  const [progressData] = useState(() => {
    const guardado = localStorage.getItem('unam_progress');
    if (guardado) {
      try {
        return JSON.parse(guardado);
      } catch {
        return {};
      }
    }
    return {};
  });

  const isTemaCompleted = (materiaId, temaId) => {
    return progressData[temaId]?.status === 'finished';
  };

  // Componente recursivo para dibujar las ramas
  const RenderRama = ({ node, materiaId, nivel }) => {
    const isLeaf = !node.hijos || node.hijos.length === 0;
    
    // Nivel base: 0=Tema Principal, 1=Subtema, 2=Sub-Subtema
    const marginLeft = nivel * 1.5;

    if (isLeaf) {
      const completed = isTemaCompleted(materiaId, node.id);
      const hasQuestions = node.ejercicios && node.ejercicios.length > 0;
      
      return (
        <div style={{ marginLeft: `${marginLeft}rem` }} className="mb-2">
          {hasQuestions ? (
            <Link 
              to={`/quiz/${materiaId}/${node.id}`}
              className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border-2 transition-all group ${
                completed ? 'border-green-400 bg-green-50 dark:bg-green-900/30' : 'border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary-400 dark:hover:border-primary-400'
              }`}
            >
              <h4 className={`text-slate-700 dark:text-slate-300 font-bold group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors ${nivel > 0 ? 'text-sm' : 'text-base'}`}>
                {node.titulo}
              </h4>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 shrink-0 ml-4 ${
                completed ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300'
              }`}>
                {completed ? <CheckCircle2 size={16} /> : null}
              </div>
            </Link>
          ) : (
             <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 opacity-60">
                <h4 className={`text-slate-500 dark:text-slate-400 font-medium ${nivel > 0 ? 'text-sm' : 'text-base'}`}>{node.titulo} (Próximamente)</h4>
             </div>
          )}
        </div>
      );
    }

    // Is a parent node
    return (
      <div style={{ marginLeft: `${marginLeft}rem` }} className="mb-4">
        <h3 className={`font-extrabold text-slate-800 dark:text-slate-200 mb-3 border-b-2 border-slate-200 dark:border-slate-700 pb-2 ${nivel === 0 ? 'text-xl uppercase tracking-wider text-primary-700 dark:text-primary-400' : 'text-lg'}`}>
          {node.titulo}
        </h3>
        <div className="space-y-1">
          {node.hijos.map(hijo => <RenderRama key={hijo.id} node={hijo} materiaId={materiaId} nivel={nivel + 1} />)}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Temario Oficial</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">Selecciona un tema para iniciar sus ejercicios. Resuelve todas las preguntas para completarlo.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {temarioA1.map((materia, i) => (
          <motion.div
            key={materia.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card overflow-hidden transition-all ${
              expandedMateria === materia.id ? 'ring-2 ring-primary-500 shadow-xl md:col-span-2 lg:col-span-3' : 'hover:shadow-md cursor-pointer'
            }`}
          >
            <div className={`h-3 w-full ${materia.color}`} />
            
            <div className="p-6">
              <button 
                className="w-full text-left flex items-center justify-between mb-2 outline-none"
                onClick={() => setExpandedMateria(expandedMateria === materia.id ? null : materia.id)}
              >
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{materia.nombre}</h2>
                {expandedMateria === materia.id ? <ChevronDown size={24} className="text-primary-500" /> : <ChevronRight size={24} className="text-slate-400" />}
              </button>
              
              <AnimatePresence>
                {expandedMateria === materia.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 mt-4 space-y-4">
                      {materia.temas.map(ramaPrincipal => (
                        <RenderRama key={ramaPrincipal.id} node={ramaPrincipal} materiaId={materia.id} nivel={0} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
