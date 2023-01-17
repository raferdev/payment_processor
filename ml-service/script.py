import os
import tensorflow as tf
import flask
import pandas as pd
from waitress import serve
from flask_expects_json import expects_json
from tensorflow import keras
from flask import jsonify, json

HOST = os.getenv('MLHOST')
PORT = os.getenv('MLPORT')
IFDEBUG = os.getenv('MLDEBUG')
TOKEN = os.getenv('INTERN_TOKEN')
MODE = os.getenv('MODE')

if IFDEBUG in ['false', 'False', 'FALSE']:
    DEBUG = False

else:
    DEBUG = True

file_url = "https://gist.githubusercontent.com/paypro-tests/76993838e65d7e0f988f40f1b1909c97/raw/9ceae962009236d3570f46e59ce9aa334e4e290f/transactional-sample.csv"
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

model = keras.models.load_model('./model')

model.fit(train_ds, epochs=50, validation_data=val_ds)

schema = {
    "type": "object",
    "properties": {
            "user_id": {"type": "number"},
            "transaction_id": {"type": "number"},
            "merchant_id": {"type": "number"},
            "card_number": {"type": "string"},
            "transaction_date": {"type": "string"},
            "transaction_amount": {"type": "number"},
            "device_id": {"type": "number"},
    },
    "required": ["transaction_id", "merchant_id", "card_number", "transaction_date", "transaction_amount", "device_id"]
}

app = flask.Flask(__name__)


@app.route("/", methods=["POST"])
@expects_json(schema)
def predict():
    if flask.request.method == "POST":
        if flask.request.headers.get("X-Api-Key") == TOKEN:

            sample = json.loads(flask.request.data)

            input_dict = {name: tf.convert_to_tensor(
                [value]) for name, value in sample.items()}
            predictions = model.predict(input_dict)

            chance = 100 * predictions[0][0]

            return jsonify({"chance": chance, "transaction_id": sample["transaction_id"]}), 200
        else:
            return jsonify({"message": "ERROR: Unauthorized"}), 401


if __name__ == '__main__':
    if MODE == 'production':
        serve(app, host=HOST, port=PORT)

    else:
        app.run(HOST, PORT, DEBUG)
