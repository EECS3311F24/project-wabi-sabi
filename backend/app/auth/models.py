from . import db
from flask_pymongo import pymongo
from flask import current_app
from mongoengine import Document, StringField, IntField, connect


#class User(Document):
    #username = StringField(required=True, unique=True)
    #email = StringField(required=True, unique=True)

    #@staticmethod
    #def find_by_username(username):
        #return mongo.db.users.find_one({"username": username})
