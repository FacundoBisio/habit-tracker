import React, { useState } from 'react'; // Importa useState
import { useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';

function HomePage() {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false); // Nuevo estado para controlar la salida

  const handleNavigateToTracker = () => {
    setIsExiting(true); // Inicia la animación de salida
    setTimeout(() => {
      navigate('/tracker'); // Navega después de que la animación termine (0.5s + un pequeño buffer)
    }, 550); // Ajusta este tiempo para que coincida con la duración de tu animación de salida
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-8
                    bg-gradient-to-br from-blue-400 to-blue-900 text-white
                    ${isExiting ? 'fade-out' : 'fade-in'}`}> {/* Aplica la clase de animación */}
      <div className="text-center">
        <p className="text-xl md:text-2xl font-light mb-4">by FacuBisio</p>
        <h1 className="text-6xl md:text-8xl font-bold mb-10 tracking-tight leading-none">Habit Tracker</h1>

        <div className="flex justify-center mt-6">
          <button className="Btn animate-bounce"
            onClick={handleNavigateToTracker}
          >
            <div className="sign"><FaCheck className="text-2xl" /></div>
            <div className="text">Start</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;