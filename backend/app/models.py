from mongoengine import *
from enum import Enum
from bson import ObjectId


def json_formatted(model):
    model_json = model.to_mongo().to_dict()
    model_json["id"] = str(model_json["_id"])
    del model_json["_id"]
    return model_json


class Tag(Document):
    text = StringField(required=True)

    def __str__(self):
        return self.text

    def json_formatted(self):
        print(f"serializing tag{self.__str__}")
        model_json = self.to_mongo().to_dict()
        model_json["id"] = str(model_json["_id"])
        del model_json["_id"]
        return model_json


class SubTask(Document):
    text = StringField(required=True)
    completed = BooleanField(required=True)

    def __str__(self):
        return self.text

    def json_formatted(self):
        print(f"serializing subtask{self.__str__}")
        model_json = self.to_mongo().to_dict()
        model_json["id"] = str(model_json["_id"])
        del model_json["_id"]
        return model_json


class Task(Document):
    STATUS_TODO = "Todo"
    STATUS_IN_PROGRESS = "In Progress"
    STATUS_FINISHED = "Finished"
    text = StringField(required=True)
    due_date = DateTimeField()
    tag = ObjectIdField()  # change to reference field once tag object exists
    status = StringField(required=True)
    tag = ReferenceField(Tag)  # change to reference field once tag object exists
    sub_tasks = ListField(ReferenceField(SubTask))

    def get_subtasks(self):
        return self.sub_tasks

    def get_subtask(self, subtask_id):
        return SubTask.objects(id=ObjectId(subtask_id)).first()

    def set_status(self, new_status):
        self.status = new_status

    def __str__(self):
        return self.text

    def json_formatted(self):
        print(f"serializing subtask{self.__str__}")
        model_json = self.to_mongo().to_dict()
        model_json["id"] = str(model_json["_id"])
        model_json["sub_tasks"] = [
            subtask.json_formatted() for subtask in self.sub_tasks
        ]

        if self.tag:
            model_json["tag"] = str(self.tag)

        print(model_json["sub_tasks"])
        del model_json["_id"]
        return model_json


class Study(Document):
    start_time = DateTimeField(required=True)
    end_time = DateTimeField(required=True)
    tag = ReferenceField(Tag)  # change to reference field once tag object exists

    def get_study_minutes(self):
        elapsed_time = self.end_time - self.start_time
        total_minutes = elapsed_time.total_seconds() // 60
        return total_minutes

    def __str__(self):
        return self.text

    def json_formatted(self):
        print(f"serializing study {self.__str__}")
        model_json = self.to_mongo().to_dict()
        model_json["id"] = str(model_json["_id"])
        del model_json["_id"]
        return model_json


class User(Document):
    email = StringField(required=True)
    password = StringField(required=True)
    tasks = ListField(ReferenceField(Task))
    study_sessions = ListField(ReferenceField(Study))
    tags = ListField(ReferenceField(Tag))

    def get_tasks(self):
        return self.tasks

    def get_task(self, task_id):
        print(task_id)
        return Task.objects(id=ObjectId(task_id)).first()

    def get_tags(self):
        return self.tags

    def get_tag(self, tag_id):
        return Tag.objects(id=ObjectId(tag_id)).first()

    def remove_task(self, task_id):
        task_to_remove = Task.objects(id=ObjectId(task_id)).first()
        self.tasks.remove(task_to_remove)
        self.save()

    def remove_tag(self, tag_id):
        tag_to_remove = Tag.objects(id=ObjectId(tag_id)).first()
        self.tags.remove(tag_to_remove)
        self.save()

    def get_study_sessions(self):
        return self.study_sessions

    def __str__(self):
        return self.username

    def json_formatted(self):
        print(f"serializing user {self.__str__}")
        model_json = self.to_mongo().to_dict()
        model_json["id"] = str(model_json["_id"])
        model_json["tasks"] = [task.json_formatted() for task in self.tasks]
        del model_json["_id"]
        return model_json
