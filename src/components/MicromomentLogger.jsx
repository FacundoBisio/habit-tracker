import React, { useState } from 'react';
import { Button, Input } from "@material-tailwind/react"; // Importa de Material Tailwind

// Agrega onLogSubmit como prop
function MicromomentLogger({ onLogSubmit }) {
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('micromoments');
    return saved ? JSON.parse(saved) : [];
  });
  const [note, setNote] = useState('');

  const logMoment = () => {
    if (!note.trim()) return;
    const newLog = { note, time: new Date().toLocaleString() };
    const updated = [newLog, ...logs];
    setLogs(updated);
    localStorage.setItem('micromoments', JSON.stringify(updated));
    setNote('');
    if (onLogSubmit) {
      onLogSubmit(); // Llama la función para cerrar el dialog
    }
  };

  return (
    <div className="space-y-4"> {/* Eliminamos el p-4 bg-gray-800 etc. ya que el Card del Dialog lo proveerá */}
      {/* Ya no necesitas los h5 y p aquí si los pones en el Dialog */}
      <div>
        <label htmlFor="micromoment-note" className="block mb-2 text-sm font-medium text-gray-300">Anotar un momento positivo</label>
        <Input // Usa Input de Material Tailwind
          id="micromoment-note"
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Ej. Me sentí bien al caminar hoy"
          className="!border-gray-600 focus:!border-blue-500 !text-white placeholder-gray-400"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>
      <Button // Usa Button de Material Tailwind
        onClick={logMoment}
        fullWidth
        className="bg-blue-600 hover:bg-blue-700 font-medium text-sm px-5 py-2.5 text-center"
      >
        Guardar Micromomento
      </Button>
      <div className="mt-6">
        <h6 className="text-lg font-semibold text-white mb-2">Registro de Micromomentos:</h6>
        <ul className="space-y-2 text-sm text-gray-300 max-h-48 overflow-y-auto custom-scrollbar">
          {logs.length > 0 ? (
            logs.map((log, i) => (
              <li key={i} className="bg-gray-700 p-2 rounded-md break-words">
                <span className="font-medium text-white">[{log.time}]</span> - {log.note}
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500">No hay micromomentos registrados aún.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default MicromomentLogger;