from mongoengine import *
from enum import Enum

# all models should go here?


class User(Document):
    email = StringField(required=True)
    password = StringField(required=True)

    def __str__(self):
        return self.username



class Task(Document):
    STATUS_TODO = "Todo"
    STATUS_IN_PROGRESS = "In Progress"
    STATUS_FINISHED = "Finished"
    is_sub_task = BooleanField(required=True) 
    text = StringField(required=True)
    due_date = DateTimeField()
    tag = ObjectIdField()
    status = StringField(required=True)
    subtasks = ListField(ObjectIdField())

    def update_status(new_status):
        status = new_status
    
    def __str__(self):
        return self.text
