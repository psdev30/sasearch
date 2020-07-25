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
    #convert mp4 file to mp3
    mp4 = 'clips_library/' + fileName + '.mp4'
    mp3 = fileName + '.mp3'
    wav = fileName + '.wav'
    videoClip = VideoFileClip(mp4)
    audioClip = videoClip.audio
    audioClip.write_audiofile(mp3)
    audioClip.close()
    videoClip.close()

    #convert mp3 to wav
    filepath = os.path.abspath(mp3)
    sound = AudioSegment.from_mp3(filepath).export(wav, format="wav")

    #extract text from wav file & set Clip model properties
    r = sr.Recognizer()
    with sr.WavFile(os.path.abspath(wav)) as source:
        audio = r.record(source)
        text = r.recognize_google(audio)
        name = fileName.title()
        if('_' in fileName):
            name = name.replace('_', ' ')
        short_path = fileName + '.mp4'

    #construct Clip object + push to db if it doesn't already exist
    if(db.session.query(Clip).filter(Clip.name == name).count() == 0):
        clipObj = Clip(name, short_path, text)
        db.session.add(clipObj)
        db.session.commit()
        return 'completed!'


if(__name__ == '__main__'):
    app.run()

