import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, XCircle, ArrowRight, Award } from 'lucide-react';
import { hojasPlanas } from '../data/temario';

export default function Quiz() {
  const { materiaId, temaId } = useParams();
  const navigate = useNavigate();

  const hojaEncontrada = hojasPlanas.find(h => h.id === temaId && h.materiaId === materiaId);
  const ejercicios = hojaEncontrada?.ejercicios || [];
  
  const total = ejercicios.length;

  // Single progress object loaded from local storage specifically for this subtopic
  const [topicProgress, setTopicProgress] = useState(() => {
    const guardado = localStorage.getItem('unam_progress');
    const stateDb = guardado ? JSON.parse(guardado) : {};
    return stateDb[temaId] || { currentIndex: 0, status: 'idle', selected: null, score: 0 };
  });

  const saveProgress = (newState) => {
    setTopicProgress(newState);
    const guardado = localStorage.getItem('unam_progress');
    const stateDb = guardado ? JSON.parse(guardado) : {};
    stateDb[temaId] = newState;
    localStorage.setItem('unam_progress', JSON.stringify(stateDb));
  };

  if (!hojaEncontrada || total === 0) {
    return (
      <div className="text-center py-20 px-4">
        <h2 className="text-2xl font-bold mb-4">No se encontraron los ejercicios de este tema.</h2>
        <Link to="/temario" className="text-blue-500 hover:underline">Regresar al Temario</Link>
      </div>
    );
  }

  const handleAnswer = (option, correctAnswer) => {
    if (topicProgress.status === 'correct' || topicProgress.status === 'finished') return;

    const isCorrect = option === correctAnswer;
    saveProgress({
      ...topicProgress,
      status: isCorrect ? 'correct' : 'incorrect',
      selected: option,
      score: (isCorrect && topicProgress.status === 'idle') ? topicProgress.score + 1 : topicProgress.score
    });
  };

  const nextQuestion = () => {
    if (topicProgress.currentIndex < total - 1) {
      saveProgress({
        ...topicProgress,
        currentIndex: topicProgress.currentIndex + 1,
        status: 'idle',
        selected: null
      });
    } else {
      saveProgress({
        ...topicProgress,
        status: 'finished'
      });
    }
  };

  const resetQuiz = () => {
    saveProgress({ currentIndex: 0, status: 'idle', selected: null, score: 0 });
  };

  if (topicProgress.status === 'finished') {
    return (
      <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="max-w-2xl mx-auto pt-10 px-4">
        <div className="glass-card p-10 text-center space-y-6">
          <Award size={64} className="mx-auto text-yellow-500" />
          <h2 className="text-3xl font-bold text-slate-800">¡Tema Completado!</h2>
          <p className="text-lg text-slate-600">
            Has finalizado todos los ejercicios para: <br/><strong className="text-slate-900">{hojaEncontrada.titulo}</strong>
          </p>
          <div className="py-4 border-y border-slate-100 flex justify-center gap-12">
            <div>
              <span className="block text-2xl font-bold text-green-600">{topicProgress.score}</span>
              <span className="text-sm font-medium text-slate-500">Puntaje Perfecto</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-slate-800">{total}</span>
              <span className="text-sm font-medium text-slate-500">Preguntas Total</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
            <button onClick={resetQuiz} className="px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors">Volver a intentar</button>
            <button onClick={() => navigate('/temario')} className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors">Regresar al temario</button>
          </div>
        </div>
      </motion.div>
    );
  }

  const currentEj = ejercicios[topicProgress.currentIndex];
  const progressPercent = ((topicProgress.currentIndex) / total) * 100;

  return (
    <div className="max-w-3xl mx-auto pt-4 px-4 space-y-8">
      
      {/* Quiz Header Tools */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <button onClick={() => navigate('/temario')} className="text-slate-500 hover:text-slate-800 flex items-center font-medium gap-2 transition-colors">
          <ArrowLeft size={20} /> Temario
        </button>
        <div className="text-right">
          <h1 className="font-bold text-slate-800 text-sm md:text-base">{hojaEncontrada.materiaNombre}</h1>
          <p className="text-xs text-slate-500 font-medium">{'<'} {hojaEncontrada.titulo} {'>'}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm font-bold text-slate-500">
          <span>Pregunta {topicProgress.currentIndex + 1} de {total}</span>
          <span className="text-green-600">Puntos: {topicProgress.score}</span>
        </div>
        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={topicProgress.currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card p-6 md:p-10 space-y-8 bg-white"
      >
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed">
          {currentEj.pregunta}
        </h2>
        
        <div className="space-y-3">
          {currentEj.opciones.map((opt, idx) => {
            let btnClass = "border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50 shadow-sm";
            const isFinished = topicProgress.status === 'correct';
            
            if (isFinished && opt === currentEj.respuesta) {
              btnClass = "border-green-500 bg-green-100 text-green-900 shadow-md ring-2 ring-green-500 ring-opacity-50 pointer-events-none";
            } else if (topicProgress.status === 'incorrect' && opt === topicProgress.selected) {
              btnClass = "border-red-400 bg-red-50 text-red-800 pointer-events-none";
            } else if (isFinished) {
              btnClass = "border-slate-100 bg-slate-50 text-slate-400 opacity-50 pointer-events-none";
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(opt, currentEj.respuesta)}
                disabled={isFinished}
                className={`w-full text-left p-5 rounded-2xl border-2 font-medium transition-all duration-200 ${btnClass}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {topicProgress.status === 'incorrect' && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginTop: 0 }} 
              animate={{ opacity: 1, height: 'auto', marginTop: 24 }} 
              className="bg-red-50 p-5 rounded-2xl border border-red-200 overflow-hidden"
            >
              <div className="flex items-center gap-2 text-red-700 font-bold mb-2">
                <XCircle size={18} /> Pista importante:
              </div>
              <p className="text-slate-800 leading-relaxed">
                {currentEj.explicacion}
              </p>
            </motion.div>
          )}

          {topicProgress.status === 'correct' && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginTop: 0 }} 
              animate={{ opacity: 1, height: 'auto', marginTop: 24 }} 
              className="bg-green-50 p-5 rounded-2xl border border-green-200 flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden"
            >
              <div className="flex items-center gap-3 text-green-800 font-bold">
                <CheckCircle2 size={24} /> 
                <span className="text-lg">¡Correcto!</span>
              </div>
              
              <button
                onClick={nextQuestion}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold shadow-lg transition-transform active:scale-95"
              >
                {topicProgress.currentIndex < total - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'} 
                <ArrowRight size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
