import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from database import get_user_data, get_user_by_id

class CourseRecommendation :
    def __init__(self):
        self.users = get_user_data()

    def course_recommendation(self, user_profile):
        user = get_user_data()
        user = user[['currentEducation', 'experienceYears', 'interest', 'learningResource', 'skill', 'tools']]

        user.dropna(inplace=True)
        course = pd.read_csv('./data/final_courses_data.csv', usecols=['id', 'title', 'combined_features'])
            
        tfidf_vectorizer = TfidfVectorizer(stop_words='english')
        tfidf_matrix_courses = tfidf_vectorizer.fit_transform(course['combined_features'])
        
        user_profile_list = [user_profile]
        user_profile_vector = tfidf_vectorizer.transform(user_profile_list)

        cosine_similarities = cosine_similarity(user_profile_vector, tfidf_matrix_courses).flatten()

        course['similarity'] = cosine_similarities

        recommendations = course.sort_values(by='similarity', ascending=False)

        # print(recommendations[['id', 'title', 'similarity']])

        recommended_course_ids = [recommendations['id'].values]

        return recommended_course_ids
        

    def get_course_recommendation(self, userId: str): 
        user_data = get_user_by_id(userId=userId)
        skill = user_data[9]
        interest = user_data[12]
        learning_resource = user_data[13]
        tools = user_data[14]
        user_profile = interest + " " + learning_resource + " " + skill + " " + tools

        return self.course_recommendation(user_profile=user_profile)