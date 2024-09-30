"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import request, jsonify, Blueprint
from api.models import db, Usuario
from flask_cors import CORS
from extensiones import bcrypt
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)

# Permitir solicitudes CORS a esta API
CORS(api,supports_credentials=True)

# Ruta para restablecer la contraseña
@api.route('restablecer-contraseña', methods=['PUT'])
def update_password():
    # Obtener los datos de la solicitud (email y new_password)
    data = request.get_json()

    # Extraer el email y la nueva contraseña del JSON
    email = data.get('email')
    new_password = data.get('new_password')

    # Verificar si el email y la nueva contraseña están presentes
    if not email or not new_password:
        return jsonify({"msg": "Email y nueva contraseña son requeridos"}), 400

    # Buscar al usuario por email en la base de datos
    user = Usuario.query.filter_by(email=email).first()

    # Si el usuario no existe, devolver un error
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    # Actualizar la contraseña del usuario en la base de datos
    user.contraseña = bcrypt.generate_password_hash(new_password).decode('utf-8')

    # Guardar los cambios en la base de datos
    try:
        db.session.commit()
        return jsonify({"msg": "Contraseña actualizada exitosamente"}), 200
    except Exception as e:
        db.session.rollback()  # Si hay un error, deshacer los cambios
        return jsonify({"msg": "Error al actualizar la contraseña", "error": str(e)}), 500


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
        # Crear el token de acceso usando el email del usuario
        access_token = create_access_token(identity=user.email)

        return jsonify({
            "message": "Inicio de sesión exitoso",
            "token": access_token
        }), 200
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
