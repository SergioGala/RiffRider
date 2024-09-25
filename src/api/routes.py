"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Simulación de una base de datos de usuarios (puedes sustituirlo por la base de datos real)
users_db = {
    "joanzam@gmail.com": {
        "password": "hashed_password_here"  # Aquí deberías tener contraseñas hasheadas
    }
}

# Ruta existente que ya tienes
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Nuevo endpoint para el inicio de sesión
@api.route('/api/login', methods=['POST'])
def login():
    # Obtener los datos enviados por el frontend
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Verificar si el usuario existe
    user = users_db.get(email)
    if user and check_password_hash(user['password'], password):
        return jsonify({"message": "Inicio de sesión exitoso"}), 200
    else:
        return jsonify({"message": "Credenciales inválidas"}), 401
