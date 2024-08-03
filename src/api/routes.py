"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def post_signup():

    new_user = User()

    new_user.email = request.json['email']
    new_user.password = generate_password_hash(request.json['password'])
    new_user.is_active = True

    db.session.add(new_user)
    db.session.commit()

    response_body = {
        "message": "Usuario creado"
    }

    return jsonify(response_body), 201


@api.route('/login', methods=['POST'])
def post_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if user is None:
        # el usuario no se encontró en la base de datos
        return jsonify({"message": "Bad username or password"}), 401

    if not check_password_hash(user.password, password):
        return jsonify({"message": "Bad username or password"}), 401

     # Crea un nuevo token con el id de usuario dentro
    access_token = create_access_token(identity=user.id)

    return jsonify({ "token": access_token, "user_id": user.id })

@api.route('profileInfo', methods=['GET'])
@jwt_required()
def getProfileInfo():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"message": "User not found"})

    user_data = {
         "id": user.id,
        "email": user.email
    }

    return jsonify(user_data), 200
