// file: AppSpeedDial.jsx
import React from 'react';
import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";
import {
  PlusIcon,
  ListBulletIcon, // Para agregar hábito
  LightBulbIcon, // Para micromomento
} from "@heroicons/react/24/outline";

// Importa los componentes de diálogo
import { AddHabitDialog } from './AddHabitDialog';
import { LogMicromomentDialog } from './LogMicromomentDialog';

export function AppSpeedDial({ setHabits }) { // Recibe setHabits
  const [openAddHabit, setOpenAddHabit] = React.useState(false);
  const [openLogMicromoment, setOpenLogMicromoment] = React.useState(false);

  const handleOpenAddHabit = () => setOpenAddHabit((cur) => !cur);
  const handleOpenLogMicromoment = () => setOpenLogMicromoment((cur) => !cur);

  const labelProps = {
    variant: "small",
    color: "blue-gray",
    className:
      "absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal !bg-gray-700 !text-gray-200 px-2 py-1 rounded-md shadow-lg",
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50"> {/* Posiciona el SpeedDial en la esquina */}
        <SpeedDial>
          <SpeedDialHandler>
            <IconButton size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg">
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent>
            <SpeedDialAction className="relative" onClick={handleOpenAddHabit}>
              <ListBulletIcon className="h-5 w-5" />
              <Typography {...labelProps}>Agregar Hábito</Typography>
            </SpeedDialAction>
            <SpeedDialAction className="relative" onClick={handleOpenLogMicromoment}>
              <LightBulbIcon className="h-5 w-5" />
              <Typography {...labelProps}>Anotar Micromomento</Typography>
            </SpeedDialAction>
            {/* Puedes añadir más SpeedDialActions aquí si necesitas */}
          </SpeedDialContent>
        </SpeedDial>
      </div>

      {/* Dialogos */}
      <AddHabitDialog open={openAddHabit} handler={handleOpenAddHabit} setHabits={setHabits} />
      <LogMicromomentDialog open={openLogMicromoment} handler={handleOpenLogMicromoment} />
    </>
  );
}