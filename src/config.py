class Config:
    SECRET_KEY = 'mysecretkey'  # Clave secreta para JWT
    SQLALCHEMY_DATABASE_URI = 'sqlite:///database.db'
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USERNAME = 'tu_correo@gmail.com'
    MAIL_PASSWORD = 'tu_contraseña'
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
