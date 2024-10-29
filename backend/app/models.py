from mongoengine import *
from enum import Enum

# all models should go here?




class Task(Document):
    STATUS_TODO = "Todo"
    STATUS_IN_PROGRESS = "In Progress"
    STATUS_FINISHED = "Finished"
    is_sub_task = BooleanField(required=True) 
    text = StringField(required=True)
    due_date = DateTimeField()
    tag = ObjectIdField()
    status = StringField(required=True)
    #sub_tasks = ListField(ReferenceField())

    def update_status(new_status):
        status = new_status
    
    def __str__(self):
        return self.text
    
    def to_json(self):
        #sub_task_json = []
        #for task in self.sub_tasks:
            #sub_task_json.append(task.to_json())

        return
        {
            'id': str(self.id),
            'is_sub_task':str(self.is_sub_task),
            'text':str(self.text),
            'due_date':str(self.due_date) if self.due_date else None,
            'tag':str(self.tag) if self.tag else None,
            'status':str(self.status),
            #'sub_tasks': str(sub_task_json),
        }
        

#class TaskMap(Document):
    #map = DictField({ReferenceField(User):ListField(ReferenceField(Task))})

class User(Document):
    email = StringField(required=True)
    password = StringField(required=True)
    tasks = ListField(ReferenceField(Task),required=True)

    def get_tasks():
        return self.tasks

    def __str__(self):
        return self.username
