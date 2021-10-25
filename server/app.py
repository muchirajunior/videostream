# type: ignore
from flask import Flask,send_from_directory
from flask_cors import CORS

app=Flask(__name__)
CORS(app)

@app.after_request
def add_header(response):
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

@app.get('/')
def index():

    return {"message":"app running"}

@app.route('/live')
def live():
    
    return send_from_directory( './','video.mkv')
