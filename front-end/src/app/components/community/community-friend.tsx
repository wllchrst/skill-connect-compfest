"use client";
import useGetFriendRecommendation from "@/app/hooks/use-get-friend-recommendation";
import Loading from "../loading";
import FriendCard from "./friend-card";
import UserFriends from "./user-friends";
import { useUserContext } from "@/app/contexts/user-context";

function CommunityFriend() {
  const { isLoading, userRecommendation } = useGetFriendRecommendation();
  const { user } = useUserContext();
  console.log(user);
  if (isLoading) return <Loading />;
  return (
    <div>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Friends
      </h2>
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        Contact your friends
      </blockquote>
      <div className="flex gap-2 mt-2 items-center overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent pb-2">
        {user.friends.map((value, index) => (
          <FriendCard friend={value} key={index} isFriend={true} />
        ))}
      </div>
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        Find new friends
      </blockquote>
      <div className="flex gap-2 mt-2 items-center overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent pb-2">
        {userRecommendation.map((user, index) => (
          <FriendCard friend={user} key={index} isFriend={false} />
        ))}
      </div>
    </div>
  );
}

export default CommunityFriend;
