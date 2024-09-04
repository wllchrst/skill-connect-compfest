import { CreateGroup } from "./create-group";
import GroupRecommendation from "./group-recommendation";

function CommunityGroup() {
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
        <GroupRecommendation />
      </div>
    </>
  );
}

export default CommunityGroup;
