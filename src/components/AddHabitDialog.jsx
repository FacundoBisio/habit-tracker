// file: addHabitDialog.jsx
import React from 'react';
import {
  Dialog,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import HabitForm from './HabitForm'; // Asegúrate de que la ruta sea correcta

export function AddHabitDialog({ open, handler, setHabits }) {
  return (
    <Dialog
      size="xs"
      open={open}
      handler={handler}
      className="bg-gray-800 shadow-lg border border-gray-700 rounded-lg" // Estilos para el dialog
    >
      <Card className="bg-transparent shadow-none w-full">
        <CardBody className="flex flex-col gap-4 p-6">
          <Typography variant="h5" color="white" className="text-center">
            Agregar Nuevo Hábito
          </Typography>
          {/* Aquí se renderiza tu HabitForm, pasándole el setHabits y el handler para cerrar */}
          <HabitForm setHabits={setHabits} onFormSubmit={handler} />
        </CardBody>
        {/* Puedes añadir un CardFooter si quieres un botón de cancelar, pero HabitForm ya tiene su botón de submit */}
      </Card>
    </Dialog>
  );
}