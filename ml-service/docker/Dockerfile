FROM tensorflow/tensorflow:2.11.0

COPY . .

RUN apt-get update && apt update
RUN apt-get -y upgrade && apt -y upgrade
RUN apt -y install graphviz
RUN python -m pip install --upgrade pip  
RUN pip install keras pandas pydot graphviz flask gevent requests pillow flask-expects-json waitress
RUN python model.py

CMD [ "python", "./script.py" ]