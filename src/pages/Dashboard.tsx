// File: src/pages/Dashboard.tsx
import React, { useState } from "react";
import HabitCard from "../components/HabitCard";

import { useLocalStorage } from "../hooks/useLocalStorage";

type Habit = {
  id: number;
  name: string;
  icon: string;
  streak: number;
};

const Dashboard = () => {
    const [habits, setHabits] = useLocalStorage<Habit[]>("habits", []);

  const markHabitDone = (id: number) => {
    setHabits(habits.map(habit =>
      habit.id === id ? { ...habit, streak: habit.streak + 1 } : habit
    ));
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {habits.map(habit => (
        <HabitCard
          key={habit.id}
          name={habit.name}
          icon={habit.icon}
          streak={habit.streak}
          onMarkDone={() => markHabitDone(habit.id)}
        />
      ))}
    </div>
  );
};

export default Dashboard;
