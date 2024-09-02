
from pydantic import BaseModel

class FriendRecommendationInput(BaseModel):
    user_id: str