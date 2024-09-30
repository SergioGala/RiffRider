"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from extensiones import bcrypt
from flask import Flask
from config import Config  
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail 
from flask_mail import Message 
from extensiones import mail


# Configuración de entorno
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False
app.config.from_object('config.Config')



# Inicializar Bcrypt
bcrypt.init_app(app)
mail.init_app(app)


# Configuración de la base de datos
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)


# Configura la clave secreta aquí
app.config['SECRET_KEY'] = 'tu_clave_secreta'

# Configuraciones adicionales como la conexión a la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'


# Inicializar la base de datos, mail y otras extensiones
db = SQLAlchemy(app)
mail = Mail(app)  




# Añadir el panel de administración
setup_admin(app)

# Añadir comandos customizados
setup_commands(app)

# Registrar el Blueprint de la API (bcrypt ya está inicializado aquí)
from api.routes import api
app.register_blueprint(api, url_prefix='/api')

# Manejo de errores como objetos JSON
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Generar sitemap con todos los endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Servir cualquier otro archivo estático
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # evitar caché
    return response

# Configura los parámetros de Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'tu_correo@gmail.com'
app.config['MAIL_PASSWORD'] = 'tu_contraseña'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)

@app.route("/send-email")
def send_email():
    msg = Message("Asunto", sender="tu_correo@gmail.com", recipients=["destinatario@gmail.com"])
    msg.body = "Este es el contenido del correo"
    mail.send(msg)
    return "Correo enviado"



# Ejecutar la aplicación
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)


  
  
