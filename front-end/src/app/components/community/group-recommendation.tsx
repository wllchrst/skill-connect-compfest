"use client";
import Loading from "../loading";
import GroupCard from "./group-card";
import { IGroup } from "@/app/interfaces/group-interface";

interface I {
  groups: IGroup[];
  isLoading: boolean;
}

function GroupRecommendation({ groups, isLoading }: I) {
  if (isLoading) return <Loading />;
  return (
    <div className="">
      <blockquote className="border-l-2 pl-6 italic mb-4">
        Group Recommendation
      </blockquote>
      <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent pb-3">
        {groups.map((group, index) => (
          <div key={index}>
            <GroupCard group={group} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupRecommendation;
