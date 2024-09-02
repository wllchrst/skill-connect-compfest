import pandas as pd
from sklearn.preprocessing import OneHotEncoder, MultiLabelBinarizer
from sklearn.neighbors import NearestNeighbors
from database import get_user_data
import numpy as np
import pickle

def clean_friend_recommendation(user_data_raw):
    drop_columns = ['description', 'profilePicture', 'filledInformation', 'createdAt', 'dateOfBirth', 'name', 'email', 'password']

    user_data_raw.drop(columns=drop_columns, inplace=True)
    user_data_raw.dropna(inplace=True)
    column_split_string = ['interest', 'skill', 'learningResource', 'tools']

    for col in column_split_string:
        user_data_raw[f'{col}_list'] = user_data_raw[col].apply(lambda x: x.split(";"))

    user_data_raw.drop(columns=column_split_string, inplace=True)
    user_data_raw.to_csv("./data/user_cleaned.csv",index=False)

    return user_data_raw

def training_friend_recommendation():
    df_not_cleaned = get_user_data()
    df = clean_friend_recommendation(df_not_cleaned)

    encoder = OneHotEncoder(handle_unknown='ignore')
    encoded_cat = encoder.fit_transform(df[['language', 'currentEducation']]).toarray()

    # Binarize the array columns
    mlb_interest = MultiLabelBinarizer()
    interest_binarized = mlb_interest.fit_transform(df['interest_list'])

    mlb_skill = MultiLabelBinarizer()
    skill_binarized = mlb_skill.fit_transform(df['skill_list'])

    mlb_learning = MultiLabelBinarizer()
    learning_binarized = mlb_learning.fit_transform(df['learningResource_list'])

    mlb_tools = MultiLabelBinarizer()
    tools_binarized = mlb_tools.fit_transform(df['tools_list'])

    # Combine all the features into one matrix
    X = np.hstack([encoded_cat, interest_binarized, skill_binarized, learning_binarized, tools_binarized, 
                df[['experienceYears']].values])

    # Create and fit the model
    knn = NearestNeighbors(n_neighbors=50, metric='euclidean')
    knn.fit(X)

    pathname = "./pickle/"

    # Save the model
    with open(pathname + 'knn_model.pkl', 'wb') as model_file:
        pickle.dump(knn, model_file)

    # Save the encoders and binarizers
    with open(pathname + 'encoder.pkl', 'wb') as encoder_file:
        pickle.dump(encoder, encoder_file)

    with open(pathname + 'mlb_interest.pkl', 'wb') as mlb_interest_file:
        pickle.dump(mlb_interest, mlb_interest_file)

    with open(pathname + 'mlb_skill.pkl', 'wb') as mlb_skill_file:
        pickle.dump(mlb_skill, mlb_skill_file)

    with open(pathname + 'mlb_learning.pkl', 'wb') as mlb_learning_file:
        pickle.dump(mlb_learning, mlb_learning_file)

    with open(pathname + 'mlb_tools.pkl', 'wb') as mlb_tools_file:
        pickle.dump(mlb_tools, mlb_tools_file)
    
