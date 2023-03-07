from celery import Celery
from prediction import predict
app = Celery('tasks', broker='amqp://guest:guest@rabbitmq:5672/', backend='redis://redis:6379/')

@app.task()
def predict_task(input_data):
    return predict(input_data)

# @app.task()
# def add(x, y):
#     return x + y