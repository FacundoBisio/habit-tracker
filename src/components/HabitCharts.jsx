import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { FaChartBar, FaChartLine } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler
);

function HabitCharts({ habits }) {

  const getWeeklyProgressData = () => {
    const daysOfWeekShort = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer a medianoche para comparaciones de fecha

    const labels = [];
    const completedCounts = Array(7).fill(0);
    const totalHabitsPerDay = Array(7).fill(0);

    // Generar etiquetas y calcular datos para los últimos 7 días (incluyendo hoy)
    for (let i = 6; i >= 0; i--) { // De 6 días atrás hasta hoy
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const formattedDate = date.toISOString().split('T')[0];
      const dayIndex = date.getDay(); // 0 para domingo, 1 para lunes, etc.

      labels.push(`${daysOfWeekShort[dayIndex]} ${date.getDate()}/${date.getMonth() + 1}`);

      habits.forEach(habit => {
        // Contar el total de hábitos *registrados* para cada día (asumimos que un hábito existe todos los días)
        totalHabitsPerDay[6 - i] += 1; // 6-i para que el día más antiguo sea el primero en el array

        if (habit.completedDates.includes(formattedDate)) {
          completedCounts[6 - i] += 1;
        }
      });
    }

    return {
      labels: labels,
      datasets: [
        {
          label: 'Hábitos Completados',
          data: completedCounts,
          backgroundColor: 'rgba(52, 211, 153, 0.8)', // green-400
          borderColor: 'rgba(52, 211, 153, 1)',
          borderWidth: 1,
        },
        {
            label: 'Hábitos Totales',
            data: totalHabitsPerDay,
            backgroundColor: 'rgba(96, 165, 250, 0.8)', // blue-400
            borderColor: 'rgba(96, 165, 250, 1)',
            borderWidth: 1,
        }
      ],
    };
  };

  const getYearlyProgressData = () => {
    // ... (Esta función no cambia) ...
    const months = [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
      ];
      const monthlyCompletions = Array(12).fill(0);
      const currentYear = new Date().getFullYear();

      habits.forEach(habit => {
        habit.completedDates.forEach(dateString => {
          const date = new Date(dateString);
          if (date.getFullYear() === currentYear) {
            const monthIndex = date.getMonth();
            monthlyCompletions[monthIndex]++;
          }
        });
      });

      return {
        labels: months,
        datasets: [
          {
            label: `Hábitos Completados en ${currentYear}`,
            data: monthlyCompletions,
            fill: true,
            backgroundColor: 'rgba(99, 102, 241, 0.2)', // indigo-500 con transparencia
            borderColor: 'rgba(99, 102, 241, 1)',
            tension: 0.3,
          },
        ],
      };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#cbd5e1', // gray-300
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(31, 41, 55, 0.9)', // gray-800 con transparencia
        titleColor: '#e5e7eb', // gray-200
        bodyColor: '#d1d5db', // gray-400
        borderColor: '#4b5563', // gray-600
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#9ca3af', // gray-400
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.3)', // gray-600 con transparencia
        },
      },
      y: {
        ticks: {
          color: '#9ca3af', // gray-400
          stepSize: 1,
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.3)', // gray-600 con transparencia
        },
      },
    },
  };

  return (
    <div className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-sm sm:p-6 md:p-8 mt-6">
      <h3 className="text-xl font-medium text-white mb-4">
        <FaChartBar className="inline-block align-middle mr-2 text-green-400" />
        Progreso Semanal
      </h3>
      <div className="h-64 mb-8">
        <Bar data={getWeeklyProgressData()} options={chartOptions} />
      </div>

      <h3 className="text-xl font-medium text-white mb-4">
        <FaChartLine className="inline-block align-middle mr-2 text-blue-400" />
        Historial Anual
      </h3>
      <div className="h-64">
        <Line data={getYearlyProgressData()} options={chartOptions} />
      </div>
    </div>
  );
}

export default HabitCharts;