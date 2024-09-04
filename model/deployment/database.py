from sqlalchemy import create_engine, text
import pandas as pd

# Create a database engine
engine = create_engine("mysql+mysqlconnector://root:password@localhost/skill-connect-compfest")

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
