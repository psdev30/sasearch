import speech_recognition as sr
import wave
import os
from pydub import AudioSegment

from flask import Flask, render_template

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

@app.route('/')
def landingPage():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)

r = sr.Recognizer()

with sr.WavFile("we_do_not_care.wav") as source:
    audio = r.record(source)
    print(r.recognize_google(audio))