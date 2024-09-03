import mysql.connector as connector
import pandas as pd

def get_userdata_from_mysql():
    skillConnectDb = connector.connect(
        host="localhost",
        user="root",
        password="",
        database="pixgolgolgol"
    )

    if(skillConnectDb.is_connected): 
        print("connection successful")

    query = "SELECT * FROM User;"
    userdata = pd.read_sql(query, skillConnectDb)
    skillConnectDb.close()

    return userdata