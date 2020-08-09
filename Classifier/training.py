
#Import the libraries necessary
from keras.preprocessing import image
from keras.layers import GlobalAveragePooling2D, Dense, Dropout
from keras.models import Model
from keras import optimizers 
from keras.callbacks import TensorBoard,ModelCheckpoint
import argparse
from time import time
import tensorflow as tf


img_size=224			#image size for Mobile Net Model
num_of_classes = 2		#Number of output classes
batch_size=10

#Normalisation and preprocessing
train_datagen = image.ImageDataGenerator(
    rescale=1./255,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True)

test_datagen = image.ImageDataGenerator(rescale=1. / 255)

#specifying paths for validation and training dataset. Change as needed
train_generator = train_datagen.flow_from_directory(
    '/content/training_dataset/',
    target_size=(img_size, img_size),
    batch_size=batch_size,
    class_mode='categorical')

validation_generator = test_datagen.flow_from_directory(
    '/content/validation_dataset/',
    target_size=(img_size,img_size),
    batch_size=batch_size,
    class_mode='categorical')

print('loading the model and the pre-trained weights...')

#Specifications for the model
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
x = Dropout(0.2)(x)
predictions = Dense(num_of_classes, activation='softmax')(x)


tensorboard = TensorBoard(log_dir="logs/{}".format(time()))

#Path for saving the model
filepath = '/content/drive/My Drive/flipkart/models/MobileNet_pretrained_model_full.h5'
checkpoint = ModelCheckpoint(filepath, monitor='val_loss', verbose=1,save_best_only=True,save_weights_only=False, mode='min', period=1)
callbacks_list = [checkpoint,tensorboard]

model = Model(inputs=base_model.input, outputs=predictions)
model.compile(loss="categorical_crossentropy", optimizer=optimizers.Adam(),metrics=["accuracy"])

num_training_img=64143
num_validation_img=17441
stepsPerEpoch = num_training_img/batch_size
validationSteps= num_validation_img/batch_size

#Train the model by specifying parameters
model.fit_generator(
    train_generator,
    steps_per_epoch=stepsPerEpoch,
    epochs=5,
    callbacks = callbacks_list,
    validation_data = validation_generator,
    # validation_steps=validationSteps
)