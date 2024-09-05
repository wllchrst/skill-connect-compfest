import { useUserContext } from "@/app/contexts/user-context";
import { IGroup } from "@/app/interfaces/group-interface";
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
import { Button } from "@/components/ui/button";
import GroupService from "@/app/service/group-service";
import ToastBuilder from "@/app/builder/toast-builder";
import { useRealtimeContext } from "@/app/contexts/realtime-context";

interface I {
  group: IGroup;
}

const groupService = new GroupService();
function GroupCard({ group }: I) {
  const { change } = useRealtimeContext();
  const { user } = useUserContext();
  const memberIds = group.members.map((value, index) => value.id);
  const toast = new ToastBuilder("Join Group");
  const isInTheGroup = memberIds.includes(user.id);

  function joinGroup() {
    groupService
      .addGroupMember({ groupId: group.id, userId: user.id })
      .then((result) => {
        if (result.data == false)
          toast.destructive(`Something went wrong ${result.message}`);
        else change();
      });
  }

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
              <Button onClick={() => joinGroup()}>Join Group</Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
export default GroupCard;
