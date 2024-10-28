from env import DB_URI
from pymongo import MongoClient


def get_mongo_client():
    client = MongoClient(DB_URI)
    try:
        client.admin.command("ping")
        print("Pinged Deployment, Connected to Mongo!")
        return client
    except Exception as e:
        print(f"Failed to connect to Mongo: {e}")
    return client


if __name__ == "__main__":
    # Get the database
    client = get_mongo_client()
