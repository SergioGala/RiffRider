"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import request, jsonify, Blueprint
from api.models import db, Usuario, Comentario  # Asegúrate de importar el modelo Comentario
from flask_cors import CORS
from extensiones import bcrypt

api = Blueprint('api', __name__)

# Permitir solicitudes CORS a esta API
CORS(api, supports_credentials=True)

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

# Nuevas rutas para gestionar comentarios

# Crear un nuevo comentario
@api.route('/comentarios', methods=['POST'])
def crear_comentario():
    data = request.get_json()
    usuario_id = data.get('usuario_id')
    cancion_id = data.get('cancion_id')
    comentario_texto = data.get('comentario')

    if not usuario_id or not cancion_id or not comentario_texto:
        return jsonify({"msg": "Usuario, canción y comentario son requeridos"}), 400

    nuevo_comentario = Comentario(usuario_id=usuario_id, cancion_id=cancion_id, comentario=comentario_texto)

    db.session.add(nuevo_comentario)
    db.session.commit()

    return jsonify(nuevo_comentario.serialize()), 201

# Obtener comentarios por ID de canción
@api.route('/comentarios', methods=['GET'])
def obtener_comentarios():
    cancion_id = request.args.get('cancion_id')
    
    if not cancion_id:
        return jsonify({"msg": "El ID de la canción es requerido"}), 400

    comentarios = Comentario.query.filter_by(cancion_id=cancion_id).all()
    
    return jsonify([comentario.serialize() for comentario in comentarios]), 200

# Actualizar un comentario
@api.route('/comentarios/<int:id>', methods=['PUT'])
def actualizar_comentario(id):
    data = request.get_json()
    comentario = Comentario.query.get(id)

    if not comentario:
        return jsonify({"msg": "Comentario no encontrado"}), 404

    comentario.comentario = data.get('comentario', comentario.comentario)
    
    db.session.commit()
    return jsonify(comentario.serialize()), 200

# Eliminar un comentario
@api.route('/comentarios/<int:id>', methods=['DELETE'])
def eliminar_comentario(id):
    comentario = Comentario.query.get(id)

    if not comentario:
        return jsonify({"msg": "Comentario no encontrado"}), 404

    db.session.delete(comentario)
    db.session.commit()
    
    return jsonify({"msg": "Comentario eliminado exitosamente"}), 204
