from flask import url_for,render_template
from algovision import app

@app.route('/',methods=['GET','POST'])
def home():
    return render_template('home.html')


@app.route('/searching',methods=['GET','POST'])
def searching():
    return render_template('searching.html')


@app.route('/sorting',methods=['GET','POST'])
def sorting():
    return render_template('sorting.html')


@app.route('/pathfinding',methods=['GET','POST'])
def pathfinding():
    return render_template('pathfinding.html')