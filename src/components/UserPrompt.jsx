import { useState, useEffect } from 'react';
import { User, Plus, Gamepad2, Ghost, Rocket, Cat, Dog, Zap, Star, Shield, ArrowLeft } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export const avatarOptions = [
  { id: 'User', icon: User, color: 'bg-blue-500' },
  { id: 'Gamepad2', icon: Gamepad2, color: 'bg-indigo-500' },
  { id: 'Ghost', icon: Ghost, color: 'bg-purple-500' },
  { id: 'Rocket', icon: Rocket, color: 'bg-rose-500' },
  { id: 'Cat', icon: Cat, color: 'bg-amber-500' },
  { id: 'Dog', icon: Dog, color: 'bg-emerald-500' },
  { id: 'Zap', icon: Zap, color: 'bg-yellow-400' },
  { id: 'Star', icon: Star, color: 'bg-fuchsia-500' },
  { id: 'Shield', icon: Shield, color: 'bg-cyan-500' },
];

export default function UserPrompt({ onLogin }) {
  const [profiles, setProfiles] = useState([]);
  const [view, setView] = useState('picker'); // 'picker' or 'create'
  
  const [newUsername, setNewUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0].id);

  // Migration and load logic
  useEffect(() => {
    let savedProfiles = localStorage.getItem('unam_profiles');
    let parsedProfiles = savedProfiles ? JSON.parse(savedProfiles) : [];

    // Legacy migration
    const legacyUser = localStorage.getItem('unam_user');
    const legacyProgress = localStorage.getItem('unam_progress');
    
    // Si no hay perfiles estructurados, pero tenemos una sesión anterior de un usuario:
    if (parsedProfiles.length === 0 && legacyUser) {
      parsedProfiles = [{
        name: legacyUser,
        avatar: 'User',
      }];
      localStorage.setItem('unam_profiles', JSON.stringify(parsedProfiles));
      
      if (legacyProgress && legacyProgress !== '{}') {
        localStorage.setItem(`unam_progress_${legacyUser}`, legacyProgress);
      }
    }

    setProfiles(parsedProfiles);
    if (parsedProfiles.length === 0) {
      setView('create');
    }
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newUsername.trim()) return;

    if (profiles.some(p => p.name.toLowerCase() === newUsername.trim().toLowerCase())) {
        alert("Ese perfil ya existe. Por favor usa otro nombre.");
        return;
    }

    const newProfile = { name: newUsername.trim(), avatar: selectedAvatar };
    const updatedProfiles = [...profiles, newProfile];
    
    localStorage.setItem('unam_profiles', JSON.stringify(updatedProfiles));
    if (!localStorage.getItem(`unam_progress_${newProfile.name}`)) {
       localStorage.setItem(`unam_progress_${newProfile.name}`, JSON.stringify({}));
    }
    
    setProfiles(updatedProfiles);
    loginWithProfile(newProfile.name);
  };

  const loginWithProfile = (name) => {
    localStorage.setItem('unam_user', name);
    onLogin(name);
  };

  const deleteProfile = (name, e) => {
    e.stopPropagation();
    if (confirm(`¿Estás seguro de que quieres eliminar el perfil de ${name}? Se perderá todo su progreso.`)) {
        const updated = profiles.filter(p => p.name !== name);
        localStorage.setItem('unam_profiles', JSON.stringify(updated));
        localStorage.removeItem(`unam_progress_${name}`);
        setProfiles(updated);
        if (updated.length === 0) setView('create');
    }
  }

  const getAvatarConfig = (id) => avatarOptions.find(a => a.id === id) || avatarOptions[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4 transition-colors duration-300 relative">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="glass-card max-w-2xl w-full p-8 md:p-12 text-center space-y-8">
        
        {view === 'picker' && (
          <div className="space-y-10 text-center">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">¿Quién está estudiando?</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Selecciona tu perfil o crea uno nuevo.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {profiles.map(profile => {
                const config = getAvatarConfig(profile.avatar);
                const IconComp = config.icon;
                return (
                  <div key={profile.name} className="relative group cursor-pointer flex flex-col items-center gap-3 w-32" onClick={() => loginWithProfile(profile.name)}>
                     <button onClick={(e) => deleteProfile(profile.name, e)} className="absolute -top-2 -right-2 w-8 h-8 bg-slate-100 dark:bg-slate-800 text-red-500 hover:text-white rounded-full opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center z-10 hover:bg-red-500 shadow-md border-2 border-white dark:border-slate-800">
                        &times;
                     </button>
                    <div className={`w-28 h-28 ${config.color} text-white rounded-[2rem] flex items-center justify-center shadow-lg transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-300 border-[6px] border-white/20 dark:border-slate-800/50`}>
                      <IconComp size={50} strokeWidth={2.5} />
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-200 truncate w-full text-center text-lg">{profile.name}</span>
                  </div>
                )
              })}

              <div className="group cursor-pointer flex flex-col items-center gap-3 w-32" onClick={() => setView('create')}>
                <div className="w-28 h-28 bg-slate-200/50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 rounded-[2rem] flex items-center justify-center shadow-sm transform group-hover:scale-105 group-hover:-translate-y-2 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/40 group-hover:text-primary-500 transition-all duration-300 border-4 border-dashed border-slate-300 dark:border-slate-700">
                  <Plus size={44} strokeWidth={3} />
                </div>
                <span className="font-bold text-slate-500 dark:text-slate-400 text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400">Agregar</span>
              </div>
            </div>
          </div>
        )}

        {view === 'create' && (
          <div className="space-y-8 max-w-md mx-auto text-left">
            {profiles.length > 0 && (
                <button onClick={() => setView('picker')} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors font-medium">
                    <ArrowLeft size={20}/> Cancelar
                </button>
            )}
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Nuevo Perfil</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Personaliza tu espacio de estudio</p>
            </div>
            
            <form onSubmit={handleCreate} className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Tu nombre o apodo</label>
                <input 
                  type="text" 
                  placeholder="Ej: Eduardo" 
                  autoFocus
                  maxLength={12}
                  className="w-full px-5 py-4 bg-white dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none text-slate-800 dark:text-slate-100 text-lg font-medium transition-all shadow-sm"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>

              <div className="space-y-3 pt-2">
                 <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Elige tu Avatar</label>
                 <div className="grid grid-cols-5 gap-3">
                    {avatarOptions.map(opt => {
                        const Icon = opt.icon;
                        const isSelected = selectedAvatar === opt.id;
                        return (
                            <button
                                key={opt.id}
                                type="button"
                                onClick={() => setSelectedAvatar(opt.id)}
                                className={`aspect-square flex items-center justify-center rounded-[1rem] transition-all border-4 ${isSelected ? `${opt.color} border-white dark:border-slate-800 shadow-xl scale-110 z-10 text-white` : 'bg-slate-100 dark:bg-slate-800 border-transparent text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105'}`}
                            >
                                <Icon size={28} strokeWidth={isSelected ? 2.5 : 2}/>
                            </button>
                        )
                    })}
                 </div>
              </div>

              <button 
                type="submit" 
                disabled={!newUsername.trim()}
                className="w-full py-4 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-primary-500/30 transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed mt-4"
              >
                Crear y Entrar
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
