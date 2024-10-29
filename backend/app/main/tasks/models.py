from enum import Enum


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
