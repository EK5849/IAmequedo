import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { mockFlashcards } from '../data/temario';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % mockFlashcards.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + mockFlashcards.length) % mockFlashcards.length);
    }, 150);
  };

  const currentCard = mockFlashcards[currentIndex];

  return (
    <div className="max-w-3xl mx-auto space-y-8 flex flex-col items-center">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Flashcards</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">Voltea la tarjeta para descubrir la respuesta.</p>
      </div>

      <div className="w-full relative h-96 perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex + (isFlipped ? "flipped" : "front")}
            initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 w-full h-full glass-card p-10 flex flex-col justify-center items-center text-center cursor-pointer shadow-2xl ${isFlipped ? 'bg-primary-50/90 dark:bg-primary-900/80' : 'bg-white/90 dark:bg-slate-800/90'}`}
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute top-6 left-6 px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium">
              {currentCard.subject}
            </div>
            <div className="absolute top-6 right-6 text-slate-400 dark:text-slate-500 font-medium">
              {currentIndex + 1} / {mockFlashcards.length}
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 leading-tight">
              {isFlipped ? currentCard.answer : currentCard.question}
            </h2>
            
            <p className="absolute bottom-6 text-sm text-slate-400 dark:text-slate-500 font-medium">
              Haz clic para {isFlipped ? 'ver la pregunta' : 'voltear'}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-4">
        <button onClick={prevCard} className="p-4 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <button onClick={nextCard} className="p-4 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30">
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}
