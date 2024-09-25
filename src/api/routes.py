"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import request, jsonify, Blueprint
from api.models import db, Usuario
from flask_bcrypt import Bcrypt
from flask_cors import CORS

api = Blueprint('api', __name__)

# Permitir solicitudes CORS a esta API
CORS(api)

# Inicialización de Bcrypt (esto debería estar en la configuración general)
bcrypt = Bcrypt()

# Endpoint para registrar un usuario
@api.route('/registro', methods=['POST'])
def registrar_usuario():
    data = request.get_json()

    # Verificar que todos los campos estén presentes
    if not all(key in data for key in ("nombre_de_usuario", "email", "contraseña", "nombre", "sexo", "edad")):
        return jsonify({"error": "Faltan datos obligatorios"}), 400

    # Verificar que el usuario o el email no existan previamente
    if Usuario.query.filter_by(nombre_de_usuario=data['nombre_de_usuario']).first() or Usuario.query.filter_by(email=data['email']).first():
        return jsonify({"error": "El nombre de usuario o el email ya están registrados"}), 400

    # Encriptar la contraseña
    contraseña_encriptada = bcrypt.generate_password_hash(data['contraseña']).decode('utf-8')

    # Crear el nuevo usuario
    nuevo_usuario = Usuario(
        nombre_de_usuario=data['nombre_de_usuario'],
        email=data['email'],
        contraseña=contraseña_encriptada,
        nombre=data['nombre'],
        sexo=data['sexo'],
        edad=data['edad']
    )

    # Guardar el usuario en la base de datos
    db.session.add(nuevo_usuario)
    db.session.commit()

    return jsonify({"mensaje": "Usuario registrado exitosamente"}), 201