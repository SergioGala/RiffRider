import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Register() {
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

  // const validateForm = () => {
  //   if (!formData.nombre || !formData.sexo || !formData.edad || !formData.email || !formData.contraseña || !formData.nombre_de_usuario) {
  //     setError('Por favor, complete todos los campos.');
  //     return false;
  //   }
  //   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
  //     setError('Por favor, ingrese un email válido.');
  //     return false;
  //   }
  //   if (formData.contraseña.length < 8) {
  //     setError('La contraseña debe tener al menos 8 caracteres.');
  //     return false;
  //   }
  //   if (isNaN(formData.edad) || formData.edad < 18 || formData.edad > 120) {
  //     setError('Por favor, ingrese una edad válida (18-120).');
  //     return false;
  //   }
  //   return true;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Usuario registrado con éxito:', data);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
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
      transition={{ duration: 0.5 }}
      className="register-form"
    >
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <select
          name="sexo"
          value={formData.sexo}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione sexo</option>
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
          <option value="Otro">Otro</option>
        </select>
        <input
          type="number"
          name="edad"
          value={formData.edad}
          onChange={handleChange}
          placeholder="Edad"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="contraseña"
          value={formData.contraseña}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />
        <input
          type="text"
          name="nombre_de_usuario"
          value={formData.nombre_de_usuario}
          onChange={handleChange}
          placeholder="Nombre de Usuario"
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </motion.div>
  );
}

export default Register;