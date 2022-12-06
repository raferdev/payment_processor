FROM tensorflow/tensorflow 

COPY ./script.py .

EXPOSE 5000

RUN apt-get update && apt update
RUN apt-get -y upgrade && apt -y upgrade
RUN apt -y install graphviz
RUN python -m pip install --upgrade pip  
RUN pip install keras pandas pydot graphviz flask gevent requests pillow flask-expects-json

CMD [ "python", "./script.py" ]