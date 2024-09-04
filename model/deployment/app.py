from fastapi import FastAPI
from interfaces import FriendRecommendationInput
from training import training_friend_recommendation
from friend_recommendation import friend_recommendation_predict
from course_searching import search_courses

app = FastAPI()

@app.post("/friend-recommendation")
def friend_recommendation(data: FriendRecommendationInput):
    print(f'user id : {data.user_id}')
    return friend_recommendation_predict(data.user_id)

@app.get('/train/friend-recommendation')
def train_friend_recommendation():
    print("training the model")
    training_friend_recommendation()
    return True

@app.get("/search/")
def search(query: str):
    results = search_courses(query)
    course_ids_array = results['id'].to_list()
    return {"course_ids": course_ids_array}