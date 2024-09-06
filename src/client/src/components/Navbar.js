import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Mi Sitio</div>
        
        {/* Menú para pantallas grandes */}
        <div className="hidden md:flex space-x-4">
          <a href="#" className="text-white hover:text-gray-300">Inicio</a>
          <a href="#" className="text-white hover:text-gray-300">Acerca</a>
          <a href="#" className="text-white hover:text-gray-300">Servicios</a>
          <a href="#" className="text-white hover:text-gray-300">Contacto</a>
        </div>
        
        {/* Botón de menú para móviles */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            <span className="block h-0.5 w-6 bg-white mb-1"></span>
            <span className="block h-0.5 w-6 bg-white mb-1"></span>
            <span className="block h-0.5 w-6 bg-white"></span>
          </button>
        </div>
      </div>
      
      {/* Menú desplegable para móviles */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md">Inicio</a>
            <a href="#" className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md">Acerca</a>
            <a href="#" className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md">Servicios</a>
            <a href="#" className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md">Contacto</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;