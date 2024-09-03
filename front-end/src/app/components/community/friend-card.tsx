"use client";

import ToastBuilder from "@/app/builder/toast-builder";
import { useUserContext } from "@/app/contexts/user-context";
import { getFirstTwoInitials } from "@/app/helpers/helper";
import { IUser } from "@/app/interfaces/user-interface";
import UserService from "@/app/service/user-service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
interface I {
  user: IUser;
}
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const userService = new UserService();

export function FriendCard({ user }: I) {
  const currentUserId = useUserContext().user.id;
  const toast = new ToastBuilder("Adding Friend");

  if (currentUserId == undefined) return <></>;

  async function addFriendHandle() {
    toast.normal("Please wait a moment");
    const response = await userService.addFriend({
      friendId: user.id,
      userId: currentUserId,
    });

    console.log(response);

    if (!response.success)
      toast.destructive("Something went wrong, please try again later!");
    else toast.normal("Adding friend success!");
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="border rounded-lg p-4 w-80 shadow-lg bg-white bg-opacity-100 flex flex-col hover:bg-gray-100">
            <div className="flex gap-3 items-center">
              <Avatar className="flex-shrink-0">
                <AvatarImage src={user.profilePictureLink} alt={user.name} />
                <AvatarFallback>
                  {getFirstTwoInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-lg text-black line-clamp-1">
                  {user.name}
                </div>
                <div className="text-sm text-gray-500 line-clamp-1">
                  {user.email}
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>
              <div className="flex gap-3 items-center">
                <Avatar className="flex-shrink-0">
                  <AvatarImage src={user.profilePictureLink} alt={user.name} />
                  <AvatarFallback>
                    {getFirstTwoInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-lg text-black line-clamp-1">
                    {user.name}
                  </div>
                  <div className="text-sm text-gray-500 line-clamp-1">
                    {user.email}
                  </div>
                </div>
              </div>
            </DialogTitle>
            <DialogDescription>
              {user.description == ""
                ? "User's description not filled"
                : user.description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-1 flex-wrap items-center">
            <p className="leading-7 [&:not(:first-child)]:mt-6 font-bold">
              SKILL
            </p>
            {user.skill.map((value, index) => (
              <div key={index}>
                <Badge>{value}</Badge>
              </div>
            ))}
          </div>
          <div className="flex gap-1 flex-wrap items-center">
            <p className="leading-7 [&:not(:first-child)]:mt-6 font-bold">
              INTEREST
            </p>
            {user.interest.map((value, index) => (
              <div key={index}>
                <Badge variant={"outline"}>{value}</Badge>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => addFriendHandle()}>
              Add Friend
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default FriendCard;
