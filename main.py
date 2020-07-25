import speech_recognition as sr
import wave
import os
from pydub import AudioSegment

from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

import speech_recognition as sr

# src_name = "we_do_not_care.mp3"
# dst_name = "we_do_not_care.wav"
#
# directory = 'C:/Users/psjuk/SASearch'
# os.chdir(directory)
#
# src = os.path.abspath(src_name)
# dst = os.path.abspath(dst_name)
# print(src)
#
# sound = AudioSegment.from_mp3('C:/Users/psjuk/SASearch/we_do_not_care.mp3').export(dst, format="wav")

app = Flask(__name__)

env = 'dev'

if(env == 'dev'):
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/SASearch'
else:
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = ''

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Clip(db.Model):
    __tablename__ = 'clip'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(200), unique = True)
    short_path = db.Column(db.String(200), unique = True)
    text = db.Column(db.Text(), unique = True)

    def __init__(self, name, short_path, text):
        self.name = name
        self.short_path = short_path
        self.text = text



@app.route('/')
def landingPage():
    return render_template('index.html')

@app.route('/search', methods =['GET'])
def search(key):
    if(request.method == 'GET'):
        print('HELLO')



if(__name__ == '__main__'):
    app.run()

# r = sr.Recognizer()
#
# with sr.WavFile("we_do_not_care.wav") as source:
#     audio = r.record(source)
#     print(r.recognize_google(audio))