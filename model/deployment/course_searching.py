import pandas as pd
import pickle
from fuzzywuzzy import process
import re
import pickle


data = pd.read_pickle('./pickle/courses_data.pkl')

with open('./pickle/results_model.pkl', 'rb') as file:
    vectorizer = pickle.load(file)

def normalize_text(text):
    text = re.sub(r'[^\w\s]', '', text)
    text = text.lower()
    return text

def search_courses(query):
    normalized_query = normalize_text(query)
    data['normalized_title'] = data['title'].apply(normalize_text)
    
    exact_matches = data[data['normalized_title'].str.contains(normalized_query, na=False)]
    non_exact_titles = data[~data['normalized_title'].str.contains(normalized_query, na=False)]['title'].tolist()
    fuzzy_results = process.extract(query, non_exact_titles, limit=5)
    
    exact_match_results = exact_matches[['id', 'title', 'normalized_title']]
    exact_match_results['similarity'] = 100

    fuzzy_match_df = pd.DataFrame(fuzzy_results, columns=['title', 'similarity'])
    fuzzy_match_df = fuzzy_match_df[fuzzy_match_df['similarity'] > 0]
    fuzzy_match_df = fuzzy_match_df.merge(data[['title', 'id']], on='title', how='left')
    
    combined_results = pd.concat([exact_match_results[['id', 'similarity']], fuzzy_match_df[['id', 'similarity']]], ignore_index=True)
    combined_results = combined_results.sort_values(by='similarity', ascending=False)

    return combined_results