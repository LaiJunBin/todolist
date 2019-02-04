from .model import User
from flask import jsonify, request, make_response

def list():
    users = User.get()
    return jsonify([{u.reference.id: u.to_dict()} for u in users])

def create():
    user = User(**request.json)
    user = user.save()
    return jsonify(success=True, message='', data=user.reference.id)

def update(id):
    user = User.doc(id)
    if user == None:
        return make_response(jsonify(success=True, message='User Not Found', data=''), 404)

    new_user = User(**request.json)

    if request.method == 'PUT':
        user.reference.set(new_user.__dict__)
    else:
        user.reference.update(new_user.__dict__)

    return jsonify(success=True, message='', data=user.to_dict())

def delete(id):
    user = User.doc(id)
    if user == None:
        return make_response(jsonify(success=True, message='User Not Found', data=''), 404)

    user.reference.delete()
    return make_response(jsonify(), 204)

def search(id):
    user = User.doc(id)
    if user == None:
        return make_response(jsonify(success=True, message='User Not Found', data=''), 404)

    return jsonify(success=True, message='', data=user.to_dict())
