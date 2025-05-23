import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// NO importes HabitForm ni MicromomentLogger directamente aquí
// import HabitForm from '../components/HabitForm';
// import MicromomentLogger from '../components/MicromomentLogger';
import HabitList from '../components/HabitList';
import StreakCounter from '../components/StreakCounter';
import HabitCharts from '../components/HabitCharts';
import { FaChartLine } from 'react-icons/fa';
import { AppSpeedDial } from '../components/AppSpeedDial'; // Importa el SpeedDial

function TrackerPage({ habits, setHabits, onHabitCompleted, animateFire }) {
    const location = useLocation();
    const [isVisibleTracker, setIsVisibleTracker] = useState(false);

    useEffect(() => {
        setIsVisibleTracker(true);
        return () => setIsVisibleTracker(false);
    }, [location.pathname]);

    return (
        <div className={`min-h-screen bg-gray-950 text-white p-6 md:p-10 ${isVisibleTracker ? 'fade-in' : 'opacity-0'}`}>
            <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-400">
                <FaChartLine className="inline-block align-middle mr-3" />
                Tu Tracker de Hábitos
            </h1>
            <p className="text-lg text-gray-300 text-center mb-10 max-w-2xl mx-auto">
                Registra tus hábitos, celebra tus micromomentos positivos y visualiza tus rachas diarias.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                {/* Columna Izquierda: Ahora vacía de formularios directos, ¡los controlará el SpeedDial! */}
                <div className="space-y-8">
                  {/* Puedes poner algo aquí si quieres, como un resumen general */}
                </div>

                {/* Columna Derecha: Listas, Rachas y Gráficos */}
                <div className="space-y-8">
                    <StreakCounter habits={habits} animateFire={animateFire} />
                    <HabitList habits={habits} setHabits={setHabits} onHabitCompleted={onHabitCompleted} />
                    <HabitCharts habits={habits} />
                </div>
            </div>

            {/* Agrega el SpeedDial al final del TrackerPage, para que aparezca en la esquina */}
            <AppSpeedDial setHabits={setHabits} /> {/* Pasa setHabits para el dialog de añadir hábito */}
        </div>
    );
}

export default TrackerPage;