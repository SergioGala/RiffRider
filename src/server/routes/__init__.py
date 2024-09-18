from flask import jsonify
from app import app

@app.route('/')
def home():
    return jsonify({"message": "Welcome to RiffRider API"})