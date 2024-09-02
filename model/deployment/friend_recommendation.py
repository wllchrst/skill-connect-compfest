import pickle
import numpy as np
import pandas as pd 
from database import get_user_by_id
import json

path_name = './pickle/'
def friend_recommendation_predict(userId: str):
    all_user_data = pd.read_csv('./data/user_cleaned.csv')
    user_data = get_user_by_id(userId=userId)
    # Load the model
    with open(path_name + 'knn_model.pkl', 'rb') as model_file:
        knn = pickle.load(model_file)

    # Load the encoders and binarizers
    with open(path_name + 'encoder.pkl', 'rb') as encoder_file:
        encoder = pickle.load(encoder_file)

    with open(path_name + 'mlb_interest.pkl', 'rb') as mlb_interest_file:
        mlb_interest = pickle.load(mlb_interest_file)

    with open(path_name + 'mlb_skill.pkl', 'rb') as mlb_skill_file:
        mlb_skill = pickle.load(mlb_skill_file)

    with open(path_name + 'mlb_learning.pkl', 'rb') as mlb_learning_file:
        mlb_learning = pickle.load(mlb_learning_file)

    with open(path_name + 'mlb_tools.pkl', 'rb') as mlb_tools_file:
        mlb_tools = pickle.load(mlb_tools_file)

    # Input data for which you want the k nearest neighbors
    input_data = pd.DataFrame({
        'language': [user_data[7]], 
        'currentEducation': [user_data[10]],
        'experienceYears': [user_data[11]],
        'interest_list': [user_data[12].split(';')],
        'skill_list': [user_data[9].split(';')],
        'learningResource_list': [user_data[13].split(";")],
        'tools_list': [user_data[14].split(';')]
    })

    # Preprocess the input data
    input_cat = encoder.transform(input_data[['language', 'currentEducation']]).toarray()
    input_interest = mlb_interest.transform(input_data['interest_list'])
    input_skill = mlb_skill.transform(input_data['skill_list'])
    input_learning = mlb_learning.transform(input_data['learningResource_list'])
    input_tools = mlb_tools.transform(input_data['tools_list'])

    # Combine the processed input
    input_combined = np.hstack([input_cat, input_interest, input_skill, input_learning, input_tools, 
                                input_data[['experienceYears']].values])

    # Find the nearest neighbors
    distances, indices = knn.kneighbors(input_combined)

    nearest_ids = all_user_data['id'].iloc[indices[0]].values

    return (nearest_ids.tolist())