import os
import random

import flask
from flask import Flask, render_template, make_response, send_file, jsonify
from flask_sqlalchemy import SQLAlchemy
import nltk
from conversions import Conversions
from flask_cors import CORS

clipDirectory = 'C:/Users/psjuk/SASearch/clips_library'

nltk.download('stopwords')

app = Flask(__name__)
CORS(app)

env = 'dev'

if(env == 'dev'):
    app.debug = False
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

#default server page
@app.route('/')
def landingPage():
    return render_template('index.html')

@app.route('/caw', methods=['GET'])
def caw():
    return flask.jsonify('hello')

@app.route('/random')
def getRandomClip():
    count = db.engine.execute('select count(id) from clip').scalar()
    randomId = random.randint(1, count)
    return randomSearch(randomId)

def randomSearch(randomId):
    results = dict()
    sqlQuery = db.engine.execute("SELECT * FROM clip WHERE id = (%s)", randomId)
    for row in sqlQuery:
        results[0] = row.short_path
    vidPath = clipDirectory + '/' + results[0]
    clip = make_response(send_file(vidPath, 'video/mp4'))
    clip.headers['Content-Disposition'] = 'inline'
    return clip

#handle search query: ONLY RETURNS FIRST CLIP IF MULTIPLE HITS
@app.route('/search/<query>', methods = ['GET'])
def querySearch(query):
    results = dict()
    counter = 0
    sqlQuery = db.engine.execute("SELECT * FROM clip WHERE text LIKE CONCAT('%%', (%s) ,'%%')", (query))

    for i in sqlQuery:
        results[counter] = i.short_path
        counter += 1
    vidPath = clipDirectory + '/' + results[0]
    clip = make_response(send_file(vidPath, 'video/mp4'))
    clip.headers['Content-Disposition'] = 'inline'
    return render_template('index.html', clip)
    return clip



#only for adding clips to library
@app.route('/addClip/<fileName>', methods =['GET'])
def addClip(fileName):
    #convert mp4 file to mp3
    wav, mp3 = Conversions.convertToMp3(fileName)

    #convert mp3 to wav
    Conversions.convertToWav(wav, mp3)

    #extract text from wav file & set Clip model properties
    name, short_path, text = Conversions.extractText(wav, fileName)

    #filter out stopwords before committing to database
    text = text.lower()
    splitText = text.split()
    splitText = [word for word in splitText if word not in nltk.corpus.stopwords.words('english')]

    #construct Clip object + push to db if it doesn't already exist
    if (db.session.query(Clip).filter(Clip.name == name).count() == 0):
        clipObj = Clip(name, short_path, splitText)
        db.session.add(clipObj)
        db.session.commit()
        return 'clip successfully added to database!'


if(__name__ == '__main__'):
    app.run()

