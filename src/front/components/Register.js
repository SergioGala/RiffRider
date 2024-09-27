import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Register({ onRegisterSuccess, onBackToApp }) {
  const [formData, setFormData] = useState({
    nombre: '',
    sexo: '',
    edad: '',
    email: '',
    contraseña: '',
    nombre_de_usuario: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      const response = await fetch(process.env.BACKEND_URL + 'registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Usuario registrado con éxito:', data);
        onRegisterSuccess(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error en el registro. Por favor, intente de nuevo.');
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
          <h2>Registro</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label>Nombre</label>
            </div>
            <div className="input-group">
  <select
    name="sexo"
    value={formData.sexo}
    onChange={handleChange}
    required
  >
    <option value="" disabled>Seleccione sexo</option>
    <option value="Hombre">Hombre</option>
    <option value="Mujer">Mujer</option>
    <option value="Otro">Otro</option>
  </select>
</div>
            <div className="input-group">
              <input
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label>Edad</label>
            </div>
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
            <div className="input-group">
              <input
                type="text"
                name="nombre_de_usuario"
                value={formData.nombre_de_usuario}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label>Nombre de Usuario</label>
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default Register;