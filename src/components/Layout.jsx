import { Outlet, Link } from 'react-router-dom';
import { BookOpen, LogOut, User } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

function Navbar({ user, setUser }) {
  return (
    <nav className="fixed top-0 w-full z-50 glass-card mx-auto max-w-5xl left-0 right-0 mt-4 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <div className="bg-primary-500 text-white p-2 rounded-xl">
          <BookOpen size={24} />
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100">IAme<span className="text-primary-600 dark:text-primary-400">quedo</span></span>
      </Link>
      <div className="flex items-center gap-1 md:gap-4">
        <div className="hidden md:flex items-center gap-2 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full text-sm font-medium">
          <User size={16} />
          <span>{user}</span>
        </div>
        <ThemeToggle />
        <button 
          onClick={() => {
            localStorage.removeItem('unam_user');
            setUser(null);
          }}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors ml-1"
          title="Cerrar Sesión"
        >
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
}

export default function Layout({ user, setUser }) {
  return (
    <div className="min-h-screen pb-24 md:pb-12 pt-28">
      <Navbar user={user} setUser={setUser} />
      <main className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
