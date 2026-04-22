import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FlaskConical, Map, ArrowRight, Lock } from 'lucide-react';

export default function Resources() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-8 pb-12 pt-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <section className="text-center space-y-4">
        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Material <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Didáctico</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Herramientas interactivas diseñadas para facilitar la comprensión de temas complejos del examen de la UNAM.
        </motion.p>
      </section>

      <motion.section variants={itemVariants} className="grid md:grid-cols-2 gap-6 pt-6">
        
        {/* Recurso Química */}
        <Link to="/recursos/quimica/tabla-periodica" className="glass-card p-6 group hover:-translate-y-1 transition-all border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800 text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
          <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <FlaskConical size={24} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">Química</div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Tabla Periódica Interactiva</h3>
              <p className="text-slate-500 dark:text-slate-400">Aprende a leer los elementos, familias, grupos y propiedades periódicas de forma visual y rápida.</p>
            </div>
            <div className="pt-2 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium group-hover:gap-3 transition-all">
              <span>Explorar recurso</span>
              <ArrowRight size={18} />
            </div>
          </div>
        </Link>

        {/* Recurso Historia (Próximamente) */}
        <div className="glass-card p-6 opacity-75 grayscale hover:grayscale-0 transition-all border border-transparent text-left relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-[1px] z-20 flex flex-col items-center justify-center pointer-events-none">
            <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-full font-bold text-sm shadow-xl flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <Lock size={16} /> Próximamente
            </div>
          </div>
          <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <Map size={24} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-1">Historia</div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Línea del Tiempo & Planisferio</h3>
              <p className="text-slate-500 dark:text-slate-400">Ubica los eventos históricos más importantes en el espacio y en el tiempo de forma sincronizada.</p>
            </div>
            <div className="pt-2 flex items-center gap-2 text-slate-400 font-medium">
              <span>En desarrollo</span>
            </div>
          </div>
        </div>

      </motion.section>
    </motion.div>
  );
}
