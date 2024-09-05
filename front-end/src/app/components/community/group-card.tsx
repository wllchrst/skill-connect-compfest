import { useUserContext } from "@/app/contexts/user-context";
import { IGroup } from "@/app/interfaces/group-interface";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GroupTab from "./group-tab";
import GroupInformation from "./group-information";

interface I {
  group: IGroup;
}
function GroupCard({ group }: I) {
  const { user } = useUserContext();
  const memberIds = group.members.map((value, index) => value.id);
  const isInTheGroup = memberIds.includes(user.id);

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className="bg-white text-black rounded-lg shadow-md p-4 max-w-sm h-[130px] w-[300px]">
            <h2 className="text-xl font-semibold mb-1 line-clamp-1 ">
              {group.groupName}
            </h2>
            <p className="text-sm text-gray-400 mb-3 line-clamp-2">
              {group.description}
            </p>
            <p className="text-xs text-gray-500">
              Created on: {new Date(group.createdAt).toLocaleDateString()}
            </p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{group.groupName}</DialogTitle>
            <DialogDescription>
              <p className="[&:not(:first-child)]:mt-6">{group.description}</p>
            </DialogDescription>
          </DialogHeader>
          {isInTheGroup ? (
            <GroupTab group={group}></GroupTab>
          ) : (
            <>
              <GroupInformation group={group} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
export default GroupCard;
