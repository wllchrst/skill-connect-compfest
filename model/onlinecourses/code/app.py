import pandas as pd
import pickle
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sklearn.metrics.pairwise import cosine_similarity

combined_data = pd.read_pickle('combined_data.pkl')

with open('vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

with open('tfidf_matrix.pkl', 'rb') as f:
    tfidf_matrix = pickle.load(f)

app = FastAPI()

class ItemRequest(BaseModel):
    item: str

@app.post("/recommend/")
def recommend_search_items(request: ItemRequest):
    item = request.item
    # if item not in combined_data['title'].values:
    #     raise HTTPException(status_code=404, detail="There is no course with that name.")
    
    item_vec = vectorizer.transform([item])
    cosine_sim = cosine_similarity(item_vec, tfidf_matrix).flatten()
    ranked_indices = cosine_sim.argsort()[:-6:-1]
    search_results = combined_data.iloc[ranked_indices]['title'].tolist()
    
    return {"recommendations": search_results}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)

# run the server with: uvicorn app:app --reload