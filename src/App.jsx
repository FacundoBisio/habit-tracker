import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Ya no necesitamos importar componentes individuales aquí, los importa TrackerPage
// import HabitForm from './components/HabitForm';
// import HabitList from './components/HabitList';
// import MicromomentLogger from './components/MicromomentLogger';
// import StreakCounter from './components/StreakCounter';
// import HabitCharts from './components/HabitCharts';
// import { FaChartLine } from 'react-icons/fa'; // Si solo se usa en TrackerPage, no va aquí

import HomePage from './pages/HomePage';
import TrackerPage from './pages/TrackerPage'; // Importa TrackerPage

import './App.css';

function App() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : [];
  });
  const [triggerFireAnimation, setTriggerFireAnimation] = useState(0);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const handleHabitCompleted = () => {
    setTriggerFireAnimation(prev => prev + 1);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/tracker"
          element={
            <TrackerPage // Renderiza TrackerPage aquí
              habits={habits}
              setHabits={setHabits}
              onHabitCompleted={handleHabitCompleted}
              animateFire={triggerFireAnimation}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;