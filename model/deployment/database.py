from sqlalchemy import create_engine, text
import pandas as pd
from dotenv import load_dotenv
import os

load_dotenv()

# Create a database engine
engine = create_engine(os.getenv("CONNECTION_STRING"))

def get_user_data():
    # Query to fetch data
    query = "SELECT * FROM User"

    # Read SQL query into a DataFrame
    df = pd.read_sql(query, engine)
    return df

def get_user_by_id(userId: str):
    with engine.connect() as connection: 
        connection = engine.connect()
        query = text("SELECT * FROM User WHERE Id LIKE :userId")
        result = connection.execute(query, {"userId": userId})
        rows = result.fetchall()
        return rows[0]
