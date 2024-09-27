"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import request, jsonify, Blueprint
from api.models import db, Usuario
from flask_cors import CORS
from app import bcrypt  # Usa el bcrypt de app.py

api = Blueprint('api', __name__)

# Permitir solicitudes CORS a esta API
CORS(api)

# Endpoint para registrar un usuario
@api.route('/registro', methods=['POST'])
def registrar_usuario():
    data = request.get_json()

    # Encriptar la contraseña utilizando bcrypt inicializado en app.py
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