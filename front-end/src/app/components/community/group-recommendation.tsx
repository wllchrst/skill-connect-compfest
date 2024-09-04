"use client";
import useGetGroupRecommendation from "@/app/hooks/use-get-group-recommendation";
import GroupService from "@/app/service/group-service";
import Loading from "../loading";
import GroupCard from "./group-card";

function GroupRecommendation() {
  const { groups, isLoading } = useGetGroupRecommendation();

  if (isLoading) return <Loading />;
  return (
    <div>
      <blockquote className="border-l-2 pl-6 italic mb-4">
        Group Recommendation
      </blockquote>
      <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent">
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
