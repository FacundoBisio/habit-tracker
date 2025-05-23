import React, { useState, useEffect } from 'react';
import { FaFire, FaCalendarCheck } from 'react-icons/fa';

function StreakCounter({ habits, animateFire }) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (animateFire) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1000); // Duración de la animación (1 segundo)
      return () => clearTimeout(timer);
    }
  }, [animateFire]);

  // Función para obtener la fecha de hoy en formato 'YYYY-MM-DD'
  const getTodayFormatted = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Función para obtener la fecha de ayer en formato 'YYYY-MM-DD'
  const getYesterdayFormatted = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  };

  // Función para calcular la racha estilo Duolingo
  const getStreak = (completedDates) => {
    if (completedDates.length === 0) return 0;

    // Ordenar las fechas de la más antigua a la más reciente
    const sortedDates = [...new Set(completedDates)].sort(); // Usar Set para eliminar duplicados

    let currentStreak = 0;
    let expectedDate = new Date(); // Empieza con la fecha actual

    // Si el hábito se completó hoy, la racha puede estar activa
    const todayFormatted = getTodayFormatted();
    if (sortedDates.includes(todayFormatted)) {
      currentStreak = 1;
      expectedDate.setDate(expectedDate.getDate() - 1); // Pasamos a ayer para revisar hacia atrás
    } else {
      // Si no se completó hoy, la racha solo puede venir de ayer o antes.
      // Si la última fecha no es ayer, la racha es 0.
      const lastCompletedDate = sortedDates[sortedDates.length - 1];
      if (lastCompletedDate !== getYesterdayFormatted()) {
        return 0; // La racha se perdió
      }
      // Si se completó ayer, empezamos la racha con 1 y la fecha esperada es anteayer.
      currentStreak = 1;
      expectedDate.setDate(expectedDate.getDate() - 2);
    }


    // Recorrer las fechas hacia atrás desde la última completada (o anteayer si completó hoy)
    for (let i = sortedDates.length - 1; i >= 0; i--) {
      const date = sortedDates[i];
      const expectedFormatted = expectedDate.toISOString().split('T')[0];

      if (date === expectedFormatted) {
        currentStreak++;
        expectedDate.setDate(expectedDate.getDate() - 1); // Revisa el día anterior
      } else if (new Date(date) < expectedDate && date !== todayFormatted) {
        // Si la fecha es anterior a lo esperado y no es hoy, la racha se rompe
        break;
      }
    }

    return currentStreak;
  };


  return (
    <div className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-sm mb-6">
      <h2 className="text-xl font-medium text-white mb-4">
        <FaFire className={`inline-block align-middle mr-2 text-orange-400 ${isAnimating ? 'animate-bounce-once' : ''}`} />
        Mis Rachas
      </h2>
      <ul className="space-y-3">
        {habits.length > 0 ? (
          habits.map(habit => (
            <li key={habit.id} className="flex justify-between items-center bg-gray-700 p-3 rounded-md">
              <span className="font-semibold text-gray-200 flex items-center">
                <FaCalendarCheck className="mr-2 text-green-400" /> {habit.name}:
              </span>
              <span className="text-blue-400 font-bold">{getStreak(habit.completedDates)} días</span>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-400">No hay hábitos para mostrar rachas.</li>
        )}
      </ul>
    </div>
  );
}

export default StreakCounter;