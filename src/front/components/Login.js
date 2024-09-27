import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Login({ onLoginSuccess, onBackToApp }) {
  const [formData, setFormData] = useState({
    email: '',
    contraseña: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await fetch(process.env.BACKEND_URL + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Inicio de sesión exitoso:', data);
        onLoginSuccess(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error en el inicio de sesión. Por favor, intente de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setError('Error de conexión. Por favor, intente de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await fetch(process.env.BACKEND_URL + 'reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        setIsResettingPassword(false);
        setError('Se ha enviado un correo con instrucciones para restablecer la contraseña.');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al solicitar el restablecimiento de contraseña. Por favor, intente de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setError('Error de conexión. Por favor, intente de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="auth-container"
    >
      <button onClick={onBackToApp} className="back-to-app-btn">Volver</button>
      <div className="auth-form">
        <div className="auth-content">
          <h2>{isResettingPassword ? 'Restablecer Contraseña' : 'Iniciar Sesión'}</h2>
          <form onSubmit={isResettingPassword ? handleResetPassword : handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label>Email</label>
            </div>
            {!isResettingPassword && (
              <div className="input-group">
                <input
                  type="password"
                  name="contraseña"
                  value={formData.contraseña}
                  onChange={handleChange}
                  required
                  placeholder=" "
                />
                <label>Contraseña</label>
              </div>
            )}
            {error && <p className="error-message">{error}</p>}
            <button type="submit" disabled={isLoading} className="submit-btn">
              {isLoading ? 'Procesando...' : (isResettingPassword ? 'Enviar Solicitud' : 'Iniciar Sesión')}
            </button>
          </form>
          <p 
            className="reset-password-link" 
            onClick={() => setIsResettingPassword(!isResettingPassword)}
          >
            {isResettingPassword ? 'Volver al inicio de sesión' : '¿Olvidaste tu contraseña?'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;