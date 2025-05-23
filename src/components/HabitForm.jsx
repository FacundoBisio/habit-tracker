import React, { useState } from 'react';
import { Button, Input, Typography } from "@material-tailwind/react"; // Importa de Material Tailwind

// Agrega onFormSubmit como prop
function HabitForm({ setHabits, onFormSubmit }) {
  const [habit, setHabit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!habit.trim()) return;

    setHabits(prev => [...prev, {
      id: Date.now(),
      name: habit,
      completedDates: []
    }]);
    setHabit('');
    if (onFormSubmit) {
      onFormSubmit(); // Llama la función para cerrar el dialog
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Ya no necesitas el h5 aquí si lo pones en el Dialog */}
      <div>
        <label htmlFor="habit-name" className="block mb-2 text-sm font-medium text-gray-300">Nombre del Hábito</label>
        <Input // Usa Input de Material Tailwind
          type="text"
          id="habit-name"
          value={habit}
          onChange={e => setHabit(e.target.value)}
          placeholder="Ej. Beber 2L de agua"
          className="!border-gray-600 focus:!border-blue-500 !text-white placeholder-gray-400" // Estilos de Tailwind
          labelProps={{
            className: "before:content-none after:content-none", // Deshabilita las etiquetas flotantes de Material Tailwind
          }}
          required
        />
      </div>
      <Button // Usa Button de Material Tailwind
        type="submit"
        fullWidth // Ocupa todo el ancho
        className="bg-blue-600 hover:bg-blue-700 font-medium text-sm px-5 py-2.5 text-center"
      >
        Agregar Hábito
      </Button>
    </form>
  );
}

export default HabitForm;