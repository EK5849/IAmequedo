import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { mockFlashcards } from '../data/temario'; // Reusing questions for simulation

export default function Simulator() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120 * 60); // 2 hours in seconds
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [simulationQuestions, setSimulationQuestions] = useState([]);

  const generateQuestions = () => {
    // Agrupar reactivos por materia
    const porMateria = {};
    mockFlashcards.forEach(q => {
      if (!porMateria[q.subject]) porMateria[q.subject] = [];
      porMateria[q.subject].push(q);
    });

    // Barajar las preguntas dentro de cada materia
    const materias = Object.keys(porMateria);
    materias.forEach(m => {
      porMateria[m].sort(() => 0.5 - Math.random());
    });

    // Extraer preguntas equilibradamente (Round-Robin)
    const seleccionadas = [];
    
    while (seleccionadas.length < 120) {
      let agotadas = 0;
      for (const m of materias) {
        if (seleccionadas.length === 120) break;
        if (porMateria[m].length > 0) {
          seleccionadas.push(porMateria[m].pop());
        } else {
          agotadas++;
        }
      }
      // Si todas las materias se quedaron sin preguntas
      if (agotadas === materias.length) break;
    }

    // Barajar el examen final para mezclar el orden de las materias
    const finalExamen = seleccionadas.sort(() => 0.5 - Math.random());
    setSimulationQuestions(finalExamen);
  };

  useEffect(() => {
    generateQuestions();
  }, []);

  const question = simulationQuestions[currentQuestion];

  const options = React.useMemo(() => {
    if (!question || !question.options) return [];
    return [...question.options].sort(() => Math.random() - 0.5);
  }, [question]);

  useEffect(() => {
    if (started && !finished && timeLeft > 0 && !selectedAnswer) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setFinished(true);
    }
  }, [started, finished, timeLeft, selectedAnswer]);

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const answerQuestion = (opt) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(opt);
    const isCorrect = opt === question.answer;
    
    if (isCorrect) setScore(s => s + 1);
    
    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestion < simulationQuestions.length - 1) {
        setCurrentQuestion(c => c + 1);
      } else {
        setFinished(true);
      }
    }, 1500);
  };

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-8 glass-card p-12">
        <AlertCircle size={48} className="mx-auto text-primary-500" />
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Simulador UNAM</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Esta es una simulación del examen. Tendrás 120 minutos para contestar {simulationQuestions.length} preguntas de opción múltiple, generadas aleatoriamente. ¡Mucho éxito!
        </p>
        <button 
          onClick={() => setStarted(true)}
          className="mx-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary-500/30 transition-transform active:scale-95"
        >
          Iniciar Simulacro
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto text-center space-y-8 glass-card p-12">
        <CheckCircle2 size={64} className="mx-auto text-green-500" />
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">¡Tiempo Agotado / Examen Terminado!</h1>
        <div className="text-2xl font-bold bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl">
          Tu puntaje: <span className="text-primary-600">{score}</span> / {simulationQuestions.length}
        </div>
        <button 
          onClick={() => {
            generateQuestions();
            setStarted(false);
            setFinished(false);
            setCurrentQuestion(0);
            setScore(0);
            setTimeLeft(120 * 60);
          }}
          className="mx-auto px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold transition-transform active:scale-95"
        >
          Volver a Intentar
        </button>
      </motion.div>
    );
  }

  if (!question) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex gap-2 items-center text-slate-500 font-medium">
          <Clock size={20} className={timeLeft < 600 ? "text-red-500 animate-pulse" : "text-primary-500"} />
          <span className={`text-xl ${timeLeft < 600 ? "text-red-500 font-bold" : ""}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
        <div className="font-bold text-slate-400">
          Pregunta {currentQuestion + 1} de {simulationQuestions.length}
        </div>
      </div>

      <motion.div 
        key={currentQuestion}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        className="glass-card p-8 md:p-12 space-y-8 shadow-xl"
      >
         <div className="inline-block px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-bold border border-primary-100 dark:border-primary-800/50 mb-4">
          {question.subject}
         </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 leading-snug">
          {question.question}
        </h2>
        
        <div className="grid gap-4 mt-8">
          {options.slice(0, 4).map((opt, i) => {
            let btnClass = "border-slate-100 dark:border-slate-700 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300";
            let iconClass = "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-primary-200 dark:group-hover:bg-primary-700 group-hover:text-primary-700 dark:group-hover:text-primary-100";
            
            if (selectedAnswer) {
              if (opt === question.answer) {
                btnClass = "border-green-500 bg-green-50 text-green-900 ring-2 ring-green-500 pointer-events-none";
                iconClass = "bg-green-500 text-white";
              } else if (opt === selectedAnswer) {
                btnClass = "border-red-400 bg-red-50 text-red-900 ring-2 ring-red-400 pointer-events-none";
                iconClass = "bg-red-500 text-white";
              } else {
                btnClass = "border-slate-100 bg-slate-50 text-slate-400 opacity-50 pointer-events-none";
                iconClass = "bg-slate-200 text-slate-400";
              }
            }

            return (
              <button
                key={i}
                disabled={selectedAnswer !== null}
                onClick={() => answerQuestion(opt)}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all font-medium text-lg group ${btnClass}`}
              >
                <span className={`inline-block w-8 h-8 text-center leading-8 rounded-full text-sm font-bold mr-4 ${iconClass}`}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
