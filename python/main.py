# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn, options
from firebase_admin import initialize_app


from instagrapi import Client
from flask import Flask, jsonify, request, make_response
import os


initialize_app()
options.set_global_options(region=options.SupportedRegion.ASIA_NORTHEAST1)


app = Flask(__name__)

@app.route('/test', methods=['GET'])
def get_data():
    data = {
        'message': '接続テスト成功'
    }
    return jsonify(data)

@app.route('/send-dm', methods=['POST'])
def send_dm():

    # Bodyから情報を取得
    data = request.get_json()
    user_name = data.get('user_name')
    password = data.get('password')
    message = data.get('message')
    user_id = data.get('user_id')

    cl = signin(user_name, password)
    send_dm(cl, message, int(user_id))

    data = {
        'message': 'Success'
    }
    response = make_response(data)
    response.status_code = 200
    return response 

@app.route('/search-by-hashtag', methods=['POST'])
def search_by_hashtag():

    # Bodyから情報を取得
    data = request.get_json()
    user_name = data.get('user_name')
    password = data.get('password')
    word = data.get('word')
    limit = data.get('limit')

    cl = signin(user_name, password)
    append_data = get_user_by_hashtag(cl, word, int(limit))

    data = {
        'users': append_data
    }
    response = make_response(data)
    response.status_code = 200
    return response 


def signin(user_name, password):
    cl = Client()
    cl.login(user_name, password)
    print('login success')
    return cl

def send_dm(cl, message, user_id):
    cl.direct_send(message, user_ids=[user_id])

def get_user_by_hashtag(cl, word, limit):
    medias = cl.hashtag_medias_recent(word, amount=limit)
    append_data = []
    for media in medias:
        data = media.dict()
        user_info = data["user"]
        user_id = int(user_info["pk"])
        user_name = user_info["username"]
        append_data.append({"user_id": user_id, "user_name": user_name})
    return append_data



# Expose Flask app as a single Cloud Function:

@https_fn.on_request()
def root(req: https_fn.Request) -> https_fn.Response:
    with app.request_context(req.environ):
        return app.full_dispatch_request()
