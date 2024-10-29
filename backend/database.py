from env import DB_URI
from pymongo import MongoClient


def get_database():
    db = MongoClient(DB_URI)
    try:
        db.admin.command("ping")
        print("Pinged Deployment, Connected to Mongo!")
        return db.wabisabi
    except Exception as e:
        print(f"Failed to connect to Mongo: {e}")
    return db.wabisabi


if __name__ == "__main__":
    # Get the database
    pass
