"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from werkzeug.security import generate_password_hash
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Ruta para restablecer la contraseña
@api.route('/api/registro', methods=['PUT'])
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
    user = User.query.filter_by(email=email).first()

    # Si el usuario no existe, devolver un error
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    # Cifrar la nueva contraseña
    hashed_password = generate_password_hash(new_password)

    # Actualizar la contraseña del usuario en la base de datos
    user.password = hashed_password

    # Guardar los cambios en la base de datos
    try:
        db.session.commit()
        return jsonify({"msg": "Contraseña actualizada exitosamente"}), 200
    except Exception as e:
        db.session.rollback()  # Si hay un error, deshacer los cambios
        return jsonify({"msg": "Error al actualizar la contraseña", "error": str(e)}), 500


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
