import { IGroup } from "@/app/interfaces/group-interface";
import { Badge } from "@/components/ui/badge";

interface I {
  group: IGroup;
}

function GroupInformation({ group }: I) {
  return (
    <>
      <blockquote className="mt-6 border-l-2 pl-6 italic">Members</blockquote>
      <div className="flex gap-1 mt-2 flex-wrap">
        {group.members.map((user, index) => (
          <div key={index}>
            <Badge>{user.name}</Badge>
          </div>
        ))}
      </div>
    </>
  );
}

export default GroupInformation;
