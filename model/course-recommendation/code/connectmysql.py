import mysql.connector as connector

skillConnectDb = connector.connect(
    host="localhost",
    user="root",
    password="",
    database="pixgolgolgol"
)

if(skillConnectDb.is_connected): 
    print("connection successful")
