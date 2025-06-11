import React from 'react';
import {
  Dialog,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import MicromomentLogger from './MicromomentLogger'; // Asegúrate de que la ruta sea correcta

export function LogMicromomentDialog({ open, handler }) {
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
            Registrar Micromomento
          </Typography>
          {/* Aquí se renderiza tu MicromomentLogger, pasándole el handler para cerrar */}
          <MicromomentLogger onLogSubmit={handler} />
        </CardBody>
        {/* Puedes añadir un CardFooter si quieres un botón de cancelar */}
      </Card>
    </Dialog>
  );
}