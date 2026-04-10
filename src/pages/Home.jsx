// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { BookOpen, Star, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
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
      className="space-y-12 pb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <section className="text-center space-y-6 pt-8 pb-12">
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 font-medium text-sm">
          <Star size={16} className="fill-current" />
          <span>¡Prepárate para la UNAM 2026!</span>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
          Domina el examen <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-blue-600">
            con confianza
          </span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Estudia interactivamente los temas de la guía oficial. Memoriza más rápido, practica con simuladores y asegura tu lugar.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {/* Botones removidos para usar las tarjetas como navegación principal */}
        </motion.div>
      </section>

      <motion.section variants={itemVariants} className="grid md:grid-cols-3 gap-6">
        <Link to="/temario" className="glass-card p-6 space-y-4 hover:-translate-y-1 transition-transform border border-transparent hover:border-blue-200 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <BookOpen size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Temario Oficial</h3>
          <p className="text-slate-500 dark:text-slate-400">Separado por áreas y materias (Matemáticas, Física, etc.). Lleva el control de lo que ya estudiaste.</p>
        </Link>
        
        <Link to="/flashcards" className="glass-card p-6 space-y-4 hover:-translate-y-1 transition-transform border border-transparent hover:border-amber-200 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Star size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Flashcards</h3>
          <p className="text-slate-500 dark:text-slate-400">Aprende conceptos clave rápidamente usando tarjetas de memoria con animaciones gamificadas.</p>
        </Link>
        
        <Link to="/simulador" className="glass-card p-6 space-y-4 hover:-translate-y-1 transition-transform border border-transparent hover:border-purple-200 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Target size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Simuladores</h3>
          <p className="text-slate-500 dark:text-slate-400">Mide tu tiempo y conocimientos respondiendo preguntas estilo UNAM antes del día real.</p>
        </Link>
      </motion.section>
    </motion.div>
  );
}
