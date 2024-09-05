"use client";
import useGetGroupRecommendation from "@/app/hooks/use-get-group-recommendation";
import { CreateGroup } from "./create-group";
import GroupRecommendation from "./group-recommendation";
import UserGroup from "./user-group";

function CommunityGroup() {
  const { groups, isLoading, userGroups } = useGetGroupRecommendation();
  return (
    <>
      <div className="flex gap-2 mt-5 flex-col">
        <div className="flex gap-4">
          <h2 className="mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Groups
          </h2>
          <CreateGroup />
        </div>

        <div></div>
        <GroupRecommendation groups={groups} isLoading={isLoading} />
        <UserGroup groups={userGroups} />
      </div>
    </>
  );
}

export default CommunityGroup;
