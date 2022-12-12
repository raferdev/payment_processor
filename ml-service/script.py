import os
import tensorflow as tf
import numpy as np
import pandas as pd
from tensorflow import keras
from tensorflow.keras import layers
from flask_expects_json import expects_json
from keras.applications import ResNet50
import flask
from flask import jsonify, json
import io
from tensorflow.keras.layers import IntegerLookup
from tensorflow.keras.layers import Normalization
from tensorflow.keras.layers import StringLookup


file_url = "https://gist.githubusercontent.com/cloudwalk-tests/76993838e65d7e0f988f40f1b1909c97/raw/9ceae962009236d3570f46e59ce9aa334e4e290f/transactional-sample.csv"
dataframe = pd.read_csv(file_url)

val_dataframe = dataframe.sample(frac=0.2, random_state=2000)
train_dataframe = dataframe.drop(val_dataframe.index)


def dataframe_to_dataset(dataframe):
    dataframe = dataframe.copy()
    labels = dataframe.pop("has_cbk")
    ds = tf.data.Dataset.from_tensor_slices((dict(dataframe), labels))
    ds = ds.shuffle(buffer_size=len(dataframe))
    return ds


train_ds = dataframe_to_dataset(train_dataframe)
val_ds = dataframe_to_dataset(val_dataframe)

for x, y in train_ds.take(1):
    print("Input:", x)
    print("Target:", y)

train_ds = train_ds.batch(50)
val_ds = val_ds.batch(50)

def encode_numerical_feature(feature, name, dataset):
    normalizer = Normalization()

    feature_ds = dataset.map(lambda x, y: x[name])
    feature_ds = feature_ds.map(lambda x: tf.expand_dims(x, -1))

    normalizer.adapt(feature_ds)

    encoded_feature = normalizer(feature)
    return encoded_feature


def encode_categorical_feature(feature, name, dataset, is_string):
    lookup_class = StringLookup if is_string else IntegerLookup

    lookup = lookup_class(output_mode="binary")

    feature_ds = dataset.map(lambda x, y: x[name])
    feature_ds = feature_ds.map(lambda x: tf.expand_dims(x, -1))

    lookup.adapt(feature_ds)

    encoded_feature = lookup(feature)
    return encoded_feature

transaction_id = keras.Input(shape=(1,), name="transaction_id", dtype="int64")
merchant_id = keras.Input(shape=(1,), name="merchant_id", dtype="int64")
user_id = keras.Input(shape=(1,), name="user_id", dtype="int64")
card_number = keras.Input(shape=(1,), name="card_number", dtype="string")
transaction_date = keras.Input(shape=(1,), name="transaction_date", dtype="string")
transaction_amount = keras.Input(shape=(1,), name="transaction_amount")
device_id = keras.Input(shape=(1,), name="device_id", dtype="int64")

all_inputs = [
    transaction_id,
    merchant_id,
    user_id,
    card_number,
    transaction_date,
    transaction_amount,
    device_id,
]

# Integer categorical features
transaction_id_encoded = encode_categorical_feature(transaction_id, "transaction_id", train_ds, False)
merchant_id_encoded = encode_categorical_feature(merchant_id, "merchant_id", train_ds, False)
user_id_encoded = encode_categorical_feature(user_id, "user_id", train_ds, False)
device_id_encoded = encode_categorical_feature(device_id, "device_id", train_ds, False)

# String categorical features
card_number_encoded = encode_categorical_feature(card_number, "card_number", train_ds, True)
transaction_date_encoded = encode_categorical_feature(transaction_date, "transaction_date", train_ds, True)

# Numerical features
transaction_amount_encoded = encode_numerical_feature(transaction_amount, "transaction_amount", train_ds)

all_features = layers.concatenate(
    [
        transaction_id_encoded,
        merchant_id_encoded,
        user_id_encoded,
        device_id_encoded,
        card_number_encoded,
        transaction_date_encoded,
        transaction_amount_encoded,
    ]
)
x = layers.Dense(32, activation="relu")(all_features)
x = layers.Dropout(0.5)(x)
output = layers.Dense(1, activation="sigmoid")(x)
model = keras.Model(all_inputs, output)
model.compile("adam", "binary_crossentropy", metrics=["accuracy"])

keras.utils.plot_model(model, show_shapes=True, rankdir="LR")

model.fit(train_ds, epochs=50, validation_data=val_ds)

schema = {
        "type": "object",
        "properties": {
        "user_id": {"type":"number"},
        "transaction_id": { "type": "number" },
        "merchant_id": { "type": "number" },
        "card_number": { "type": "string" },
        "transaction_date": { "type": "string" },
        "transaction_amount": { "type": "number" },
        "device_id": { "type": "number" },
    },
"required": ["transaction_id","merchant_id","card_number","transaction_date","transaction_amount","device_id"]
}

app = flask.Flask(__name__)

@app.route("/", methods=["POST"])

@expects_json(schema)

def predict():
    if flask.request.method == "POST":
        if flask.request.headers.get("X-Api-Key")== os.getenv('INTERN_TOKEN'):
            sample = json.loads(flask.request.data)
            input_dict = { name: tf.convert_to_tensor([value]) for name, value in sample.items() }
            predictions = model.predict(input_dict)
            chance = 100 * predictions[0][0]
            return jsonify({"chance": chance, "transaction_id": sample["transaction_id"]}), 200
        else:
            return jsonify({"message": "ERROR: Unauthorized"}), 401

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000, debug=False)