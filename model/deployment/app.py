from fastapi import FastAPI
from interfaces import FriendRecommendationInput
from training import training_friend_recommendation
from friend_recommendation import friend_recommendation_predict

app = FastAPI()

@app.post("/friend-recommendation")
def friend_recommendation(data: FriendRecommendationInput):
    print(f'user id : {data.user_id}')
    return friend_recommendation_predict(data.user_id)

@app.get('/train/friend-recommendation')
def train_friend_recommendation():
    training_friend_recommendation()
    return True