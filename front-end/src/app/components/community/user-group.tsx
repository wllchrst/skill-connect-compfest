import { IGroup } from "@/app/interfaces/group-interface";
import GroupCard from "./group-card";

interface I {
  groups: IGroup[];
}

function UserGroup({ groups }: I) {
  return (
    <>
      <div>
        <blockquote className="border-l-2 pl-6 italic mb-4">
          Your Groups
        </blockquote>
        <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent pb-3">
          {groups.map((group, index) => (
            <div key={index}>
              <GroupCard group={group} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserGroup;
