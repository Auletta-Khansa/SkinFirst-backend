import numpy as np
import os
from flask import Flask, request, jsonify
from PIL import Image
from keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img
from tensorflow import expand_dims

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads/'
model = load_model('SkinFirst.h5')

class_dict = {0: 'Actinic keratosis', 
              1: 'Atopic Dermatitis', 
              2: 'Benign keratosis', 
              3: 'Dermatofibroma', 
              4: 'Melanocytic nevus', 
              5: 'Melanoma',
              6: 'Squamous cell carcinoma',
              7: 'Tinea Ringworm Candidiasis',
              8: 'Vascular lesion'}

def predict_label(img_path):
    loaded_img = load_img(img_path, target_size=(224, 224))
    img_array = img_to_array(loaded_img) / 255.0
    img_array = expand_dims(img_array, 0)
    predicted_bit = np.argmax(model.predict(img_array))
    return class_dict[predicted_bit]

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        if 'image' not in request.files:
            return jsonify({'error': 'No image found'})

        image = request.files['image']
        img_path = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
        image.save(img_path)
        prediction = predict_label(img_path)
        result = {'uploaded_image': image.filename, 'prediction': prediction}
        return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
