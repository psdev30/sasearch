import speech_recognition as sr
import wave
import os
from pydub import AudioSegment
from moviepy.editor import *

from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

import speech_recognition as sr

src_name = "we_do_not_care.mp3"
dst_name = "we_do_not_care.wav"

directory = 'C:/Users/psjuk/SASearch'
os.chdir(directory)


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

@app.route('/search/<fileName>', methods =['GET'])
def search(fileName):
    mp4 = 'clips_library/' + fileName + '.mp4'
    mp3 = fileName + '.mp3'
    wav = fileName + '.wav'
    videoClip = VideoFileClip(mp4)
    audioClip = videoClip.audio
    audioClip.write_audiofile(mp3)
    audioClip.close()
    videoClip.close()

    filepath = os.path.abspath(mp3)
    sound = AudioSegment.from_mp3(filepath).export(wav, format="wav")

    r = sr.Recognizer()

    with sr.WavFile(os.path.abspath(wav)) as source:
        audio = r.record(source)
        print(r.recognize_google(audio))

    return 'completed!'


if(__name__ == '__main__'):
    app.run()

