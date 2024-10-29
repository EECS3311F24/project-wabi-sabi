from mongoengine import *
from enum import Enum

# all models should go here?


class User(Document):
    email = StringField(required=True)
    password = StringField(required=True)

    def __str__(self):
        return self.username


class TASK_STATUS(Enum):
    TODO = "Todo"
    IN_PROGRESS = "In Progress"
    FINISHED = "Finished"

class Task:
    def __init__(description):
        self.taskId = ""
        self.is_sub_task = False
        self.description = description
        self.due_date = ""
        self.tag = ""
        self.status = TASK_STATUS.TODO