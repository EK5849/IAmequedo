import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { BookOpen, Star, Target, Trophy, CheckCircle, Zap, BookMarked } from 'lucide-react';
import { Link } from 'react-router-dom';
import { hojasPlanas, temarioA1 } from '../data/temario';

function DashboardStats() {
  const [stats, setStats] = useState({ 
    score: 0, totalScore: 0, 
    completed: 0, totalTopics: 0, 
    completedSubjects: 0, totalSubjects: 0 
  });

  useEffect(() => {
    const currentUser = localStorage.getItem('unam_user');
    if (!currentUser) return;
    
    // Calcular totales disponibles
    const topicsWithExercises = hojasPlanas.filter(h => h.ejercicios && h.ejercicios.length > 0);
    const totalTopics = topicsWithExercises.length;
    const totalScore = topicsWithExercises.reduce((acc, h) => acc + h.ejercicios.length, 0);
    const totalSubjects = temarioA1.length;

    const guardado = localStorage.getItem(`unam_progress_${currentUser}`);
    if (guardado) {
      try {
        const progress = JSON.parse(guardado);
        let score = 0;
        let completed = 0;
        let completedSubjectsCount = 0;
        
        Object.values(progress).forEach(item => {
           if (item.score) score += item.score;
           if (item.status === 'finished') completed++;
        });

        temarioA1.forEach(materia => {
           const topicsForMateria = topicsWithExercises.filter(h => h.materiaId === materia.id);
           if (topicsForMateria.length > 0) {
              const allFinished = topicsForMateria.every(h => progress[h.id]?.status === 'finished');
              if (allFinished) {
                 completedSubjectsCount++;
              }
           }
        });
        
        setStats({ 
          score, totalScore, 
          completed, totalTopics, 
          completedSubjects: completedSubjectsCount, totalSubjects 
        });
      } catch (e) {}
    } else {
        setStats({ 
          score: 0, totalScore, 
          completed: 0, totalTopics, 
          completedSubjects: 0, totalSubjects 
        });
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-3 gap-4 md:gap-6 pt-4 pb-8"
    >
      <div className="glass-card p-4 md:p-6 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400 rounded-2xl flex items-center justify-center mb-3 border border-yellow-200 dark:border-yellow-800">
          <Trophy size={24} />
        </div>
        <div className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100">{stats.score} / {stats.totalScore}</div>
        <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Puntos Obtenidos</div>
      </div>
      
      <div className="glass-card p-4 md:p-6 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center mb-3 border border-green-200 dark:border-green-800">
          <CheckCircle size={24} />
        </div>
        <div className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100">{stats.completed} / {stats.totalTopics}</div>
        <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Temas Listos</div>
      </div>
      
      <div className="glass-card p-4 md:p-6 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 rounded-2xl flex items-center justify-center mb-3 border border-primary-200 dark:border-primary-800">
          <BookMarked size={24} />
        </div>
        <div className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100">{stats.completedSubjects} / {stats.totalSubjects}</div>
        <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Materias Completadas</div>
      </div>
    </motion.div>
  );
}

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
      <section className="text-center space-y-6 pt-8 pb-4">
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
      </section>

      <motion.div variants={itemVariants}>
        <DashboardStats />
      </motion.div>

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
