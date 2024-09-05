"use client";
import FriendCard from "./friend-card";
import { useUserContext } from "@/app/contexts/user-context";
import FriendRecommendation from "./friend-recommendation";
import { IUser } from "@/app/interfaces/user-interface";

function CommunityFriend() {
  const { user } = useUserContext();
  return (
    <div>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Friends
      </h2>

      {user.friends.length > 0 && (
        <>
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            Contact your friends
          </blockquote>
          <div className="flex gap-2 mt-2 items-center overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent pb-2">
            {user.friends.map((value: IUser, index: number) => (
              <FriendCard friend={value} key={index} isFriend={true} />
            ))}
          </div>
        </>
      )}

      <FriendRecommendation />
    </div>
  );
}

export default CommunityFriend;
