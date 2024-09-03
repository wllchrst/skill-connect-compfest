"use client";
import useGetFriendRecommendation from "@/app/hooks/use-get-friend-recommendation";
import Loading from "../loading";
import FriendCard from "./friend-card";
import UserFriends from "./user-friends";

function CommunityFriend() {
  const { isLoading, userRecommendation } = useGetFriendRecommendation();
  if (isLoading) return <Loading />;
  return (
    <div>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Friends
      </h2>
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        Find new friends
      </blockquote>
      <div className="flex gap-2 mt-2 items-center overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent pb-2">
        {userRecommendation.map((user, index) => (
          <FriendCard user={user} key={index} />
        ))}
      </div>
      <UserFriends />
    </div>
  );
}

export default CommunityFriend;
