from fastapi import FastAPI
from interfaces import FriendRecommendationInput
from training import training_friend_recommendation
from friend_recommendation import friend_recommendation_predict
from course_searching import search_courses
from course_recommendation import CourseRecommendation

app = FastAPI()
course_recommendation = CourseRecommendation()

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

@app.get("/course_recommendation") 
def search(user_id: str):
    course_ids = course_recommendation.get_course_recommendation(user_id)
    print(course_ids)
    return course_ids[0].tolist()