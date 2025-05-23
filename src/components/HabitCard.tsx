//File: src/components/HabitCard.tsx
import React from "react";

type Props = {
  name: string;
  icon: string;
  streak: number;
  onMarkDone: () => void;
};

const HabitCard = ({ name, icon, streak, onMarkDone }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
      <div className="text-4xl">{icon}</div>
      <h2 className="text-xl font-bold mt-2">{name}</h2>
      <p className="text-gray-500 mt-1">🔥 {streak} días seguidos</p>
      <button
        onClick={onMarkDone}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full"
      >
        Hecho hoy ✅
      </button>
    </div>
  );
};

export default HabitCard;
