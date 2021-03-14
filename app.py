from flask import Flask, render_template, flash
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.config['SECRET_KEY'] = 'thisIStheKEY'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

@app.route('/')
def home_page():
    return render_template('simpleAPI.html')