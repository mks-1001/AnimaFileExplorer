from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import os

load_dotenv()  # This loads the variables from .env

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

GIPHY_API_KEY = os.getenv('GIPHY_API_KEY')

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    if file:
        filename = file.filename
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        file_size = os.path.getsize(file_path)
        file_type = file.content_type
        
        return jsonify({
            'name': filename,
            'size': f"{file_size} bytes",
            'type': file_type
        })

@app.route('/get_api_key')
def get_api_key():
    return jsonify({'api_key': GIPHY_API_KEY})

if __name__ == '__main__':
    app.run(debug=True)
