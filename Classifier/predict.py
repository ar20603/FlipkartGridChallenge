#Import Libraries
from keras.preprocessing import image
from keras.layers import GlobalAveragePooling2D, Dense, Dropout
from keras.models import Model
from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
import numpy as np
import tensorflow as tf
import shutil
import urllib
import cv2
import urllib.request
from google.colab.patches import cv2_imshow


#Define MobileNet CNN model
base_model = tf.keras.applications.MobileNet(
    include_top=False,
    weights="imagenet",
    input_tensor=None,
    input_shape=None,
    pooling=None,
    classes=2,
    classifier_activation="softmax",
)

x = base_model.output
x = Dense(128)(x)
x = GlobalAveragePooling2D()(x)
predictions = Dense(2, activation='softmax')(x)
model = Model(inputs=base_model.input, outputs=predictions)
model.load_weights("model.h5")
inputShape = (224,224) # Assumes 3 channel image

#Display the image
img = cv2.imread('tshirt.jpg',1)
cv2_imshow(img)
cv2.waitKey(0)
cv2.destroyAllWindows()

#Load the image for processing to the trained model
image = load_img('tshirt.jpg', target_size=inputShape)
image = img_to_array(image)   # shape is (224,224,3)
image = np.expand_dims(image, axis=0)  # Now shape is (1,224,224,3)
image = image/255.0
preds = model.predict(image)

#Threshold for the model set to 85% confidence
if preds[0][1] >= 0.85:
    print("TShirt")
else:
    print("Not TShirt")