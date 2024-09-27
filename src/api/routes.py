"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import request, jsonify, Blueprint
from api.models import db, Usuario
from flask_cors import CORS
from extensiones import bcrypt


api = Blueprint('api', __name__)

# Permitir solicitudes CORS a esta API
CORS(api,supports_credentials=True)

# Ruta existente que ya tienes
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



# Nuevo endpoint para el inicio de sesión
@api.route('login', methods=['POST'])
def login():
    # Obtener los datos enviados por el frontend
    data = request.get_json()
    email = data.get('email')
    password = data.get('contraseña')

    # Verificar si el usuario existe
    user = Usuario.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.contraseña, password):
        return jsonify({"message": "Inicio de sesión exitoso"}), 200
    else:
        return jsonify({"message": "Credenciales inválidas"}), 401
    
    
    
# Endpoint para registrar un usuario
@api.route('/registro', methods=['POST'])
def registrar_usuario():
    data = request.get_json()

    # Encriptar la contraseña utilizando bcrypt inicializado en app.py
    contraseña_encriptada = bcrypt.generate_password_hash(data["contraseña"]).decode('utf-8')

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
