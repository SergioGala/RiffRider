from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre_de_usuario = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    contraseña = db.Column(db.String(60), nullable=False)
    nombre = db.Column(db.String(100), nullable=False)
    sexo = db.Column(db.String(20), nullable=False)
    edad = db.Column(db.Integer, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
   