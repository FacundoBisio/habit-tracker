// src/components/HabitList.js
import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaListAlt } from 'react-icons/fa';

function HabitList({ habits, setHabits, onHabitCompleted }) {
  const toggleComplete = (id) => {
    // Obtener la fecha de hoy en formato YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    const updatedHabits = habits.map(habit => {
      if (habit.id !== id) return habit;
      const hasToday = habit.completedDates.includes(today);

      let newCompletedDates;
      if (hasToday) {
        newCompletedDates = habit.completedDates.filter(d => d !== today);
      } else {
        newCompletedDates = [...habit.completedDates, today];
      }
      return {
        ...habit,
        completedDates: newCompletedDates
      };
    });
    setHabits(updatedHabits);

    const completedHabit = updatedHabits.find(h => h.id === id);
    if (completedHabit && completedHabit.completedDates.includes(today)) {
      onHabitCompleted(); // Llama la función si el hábito fue marcado como completado hoy
    }
  };

  return (
    <div className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-sm sm:p-6 md:p-8">
      <h5 className="text-xl font-medium text-white mb-4">
        <FaListAlt className="inline-block align-middle mr-2 text-blue-400" />
        Lista de Hábitos
      </h5>
      <ul className="space-y-3">
        {habits.length > 0 ? (
          habits.map(habit => (
            <li key={habit.id} className="flex items-center justify-between bg-gray-700 p-3 rounded-md">
              <span className="text-gray-200">{habit.name}</span>
              <button
                onClick={() => toggleComplete(habit.id)}
                className={`px-4 py-2 rounded-md font-semibold text-white transition-colors duration-200 flex items-center justify-center gap-1
                  ${habit.completedDates.includes(new Date().toISOString().split('T')[0])
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                  }`}
              >
                {habit.completedDates.includes(new Date().toISOString().split('T')[0]) ? (
                  <>
                    <FaCheckCircle className="text-lg" /> Completado
                  </>
                ) : (
                  <>
                    <FaTimesCircle className="text-lg" /> Marcar
                  </>
                )}
              </button>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-400">No hay hábitos registrados aún.</li>
        )}
      </ul>
    </div>
  );
}

export default HabitList;