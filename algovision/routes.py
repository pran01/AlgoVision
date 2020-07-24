from flask import url_for,render_template
from algovision import app

@app.route('/',methods=['GET','POST'])
def home():
    return render_template('home.html')