import useGetFriendRecommendation from "@/app/hooks/use-get-friend-recommendation";
import FriendCard from "./friend-card";

function FriendRecommendation() {
  const { isLoading, userRecommendation } = useGetFriendRecommendation();
  return (
    <>
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        Find new friends
      </blockquote>
      <div className="flex gap-2 mt-2 items-center overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent pb-2">
        {userRecommendation.map((user, index) => (
          <FriendCard friend={user} key={index} isFriend={false} />
        ))}
      </div>
    </>
  );
}

export default FriendRecommendation;
