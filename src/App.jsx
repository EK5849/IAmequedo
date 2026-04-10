import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Syllabus from './pages/Syllabus';
import Flashcards from './pages/Flashcards';
import Simulator from './pages/Simulator';
import UserPrompt from './components/UserPrompt';
import Quiz from './pages/Quiz';

function App() {
  const [user, setUser] = useState(() => localStorage.getItem('unam_user'));

  if (!user) {
    return <UserPrompt onLogin={setUser} />;
  }

  return (
    <BrowserRouter basename="/IAmequedo/">
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          <Route index element={<Home />} />
          <Route path="temario" element={<Syllabus />} />
          <Route path="quiz/:materiaId/:temaId" element={<Quiz />} />
          <Route path="flashcards" element={<Flashcards />} />
          <Route path="simulador" element={<Simulator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
