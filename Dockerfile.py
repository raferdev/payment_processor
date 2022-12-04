FROM tensorflow/tensorflow

COPY script.py ./data ./

EXPOSE 8888

CMD ["python", "script.py"]