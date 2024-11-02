from mongoengine import *
from enum import Enum
from bson import ObjectId

# all models should go here?


class Task(Document):
    STATUS_TODO = "Todo"
    STATUS_IN_PROGRESS = "In Progress"
    STATUS_FINISHED = "Finished"

    is_sub_task = BooleanField(required=True)
    text = StringField(required=True)
    due_date = DateTimeField()
    tag = ObjectIdField()  # change to reference field once tag object exists
    status = StringField(required=True)
    # sub_tasks = ListField(ReferenceField())

    def set_status(self,new_status):
        self.status = new_status

    def __str__(self):
        return self.text

    def to_json(self):
        print(f"jsonifying {self.text}")
        #sub_task_json = []
        #for task in self.sub_tasks:
            #sub_task_json.append(task.to_json())
        jsonified = {
            "id": str(self.id),
            "is_sub_task": self.is_sub_task,
            "text": str(self.text),
            "due_date": self.due_date if self.due_date else None,
            "tag": str(self.tag) if self.tag else None,
            "status": str(self.status),
            #'sub_tasks': str(sub_task_json),
        }
        print(jsonified)
        return jsonified


class Study(Document):
    start_time = DateTimeField(required=True)
    end_time = DateTimeField(required=True)
    tag = ObjectIdField()  # change to reference field once tag object exists

    def __str__(self):
        return self.text

    def to_json(self):
        jsonified = {
            "id": str(self.id),
            "start_time": self.start_time,
            "end_time": self.end_time,
            "tag": str(self.tag) if self.tag else None,
            #'sub_tasks': str(sub_task_json),
        }
        print(jsonified)
        return jsonified


class User(Document):
    email = StringField(required=True)
    password = StringField(required=True)
    tasks = ListField(ReferenceField(Task))
    study_sessions = ListField(ReferenceField(Study))

    def get_tasks(self):
        return self.tasks

    def get_task(self,task_id):
        print(task_id)
        return Task.objects(id=ObjectId(task_id)).first()

    def get_study_sessions(self):
        return self.study_sessions

    def __str__(self):
        return self.username
