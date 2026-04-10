import { useState } from 'react';
import { User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function UserPrompt({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('unam_user', username);
      localStorage.setItem('unam_progress', JSON.stringify({}));
      onLogin(username);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4 transition-colors duration-300 relative">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      <div className="glass-card max-w-md w-full p-8 text-center space-y-6">
        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mx-auto">
          <User size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">¡Bienvenido!</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Crea un perfil para guardar el progreso de estudio localmente en tu dispositivo.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <input 
            type="text" 
            placeholder="Introduce tu nombre" 
            autoFocus
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-slate-800 dark:text-slate-200 dark:placeholder-slate-500 transition-colors"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button 
            type="submit" 
            disabled={!username.trim()}
            className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50"
          >
            Comenzar a Estudiar
          </button>
        </form>
      </div>
    </div>
  );
}
