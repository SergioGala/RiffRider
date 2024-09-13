import React, { useState, useEffect } from 'react';

const InternetConnectionCheck = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div style={{ backgroundColor: 'red', color: 'white', padding: '10px', textAlign: 'center' }}>
      No hay conexión a Internet. Algunas funciones pueden no estar disponibles.
    </div>
  );
};

export default InternetConnectionCheck;