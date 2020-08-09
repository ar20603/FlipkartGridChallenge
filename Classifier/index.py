#Import Libraries
from keras.preprocessing import image
from keras.layers import GlobalAveragePooling2D, Dense, Dropout
from keras.models import Model
from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
import numpy as np
import tensorflow as tf
import shutil
import requests
import urllib
import cv2
import urllib.request

from flask_ngrok import run_with_ngrok
from flask import Flask
from flask import request
import pymongo
from pymongo import MongoClient
from datetime import datetime
import json
from flask import jsonify
app = Flask(__name__)
run_with_ngrok(app) 

##Define MobileNet CNN model
base_model = tf.keras.applications.MobileNet(
    include_top=False,
    weights="imagenet",
    input_tensor=None,
    input_shape=None,
    pooling=None,
    classes=2,
    classifier_activation="softmax",
)

img_size = 224
filepath = 'MobileNet_pretrained_model_full.h5'

x = base_model.output
x = Dense(128)(x)
x = GlobalAveragePooling2D()(x)
predictions = Dense(2, activation='softmax')(x)
model = Model(inputs=base_model.input, outputs=predictions)
model.load_weights(filepath)
inputShape = (img_size,img_size) # Assumes 3 channel image

@app.route('/')
def classify():
    args = request.args
    image_url = ""
    if ( len(args.getlist('image_url')) > 0 ):
        image_url = args.getlist('image_url')[0]
    else :
        return jsonify({"status": "Image URL missing"}), 400    

    # test that url here
    url = "https://images-na.ssl-images-amazon.com/images/I/916q4pTEEaL._UY695_.jpg"
    url = image_url
    print(image_url)

    # response = requests.get(url, stream=True)
    # with open('img.png', 'wb') as out_file:
        # shutil.copyfileobj(response.raw, out_file)
    # del response
    url_response = urllib.request.urlopen(url)

    img_array = np.array(bytearray(url_response.read()), dtype=np.uint8)
    img = cv2.imdecode(img_array, -1)
    cv2.imwrite("img.png", img)
    image = load_img('img.png', target_size=inputShape)
    image = img_to_array(image)   # shape is (224,224,3)
    image = np.expand_dims(image, axis=0)  # Now shape is (1,224,224,3)
    image = image/255.0
    preds = model.predict(image)
    print(preds)
	
	#Threshold set to 85% confidence
    if preds[0][1] >= 0.85:
        category = "tshirt"
    else:
        category = "non-tshirt"

    return jsonify({"status": "Classified successfully", "category": category}), 200

if __name__ == '__main__':
    app.run()