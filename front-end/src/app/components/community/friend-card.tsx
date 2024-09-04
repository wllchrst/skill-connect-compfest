"use client";

import ToastBuilder from "@/app/builder/toast-builder";
import { useUserContext } from "@/app/contexts/user-context";
import { getFirstTwoInitials } from "@/app/helpers/helper";
import { IUser } from "@/app/interfaces/user-interface";
import UserService from "@/app/service/user-service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
interface I {
  friend: IUser;
  isFriend: boolean;
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
import UserProfile from "./user-profile";
import FriendProfile from "./friend-profile";

const userService = new UserService();

export function FriendCard({ friend, isFriend }: I) {
  const { user } = useUserContext();
  const toast = new ToastBuilder("Adding Friend");

  if (user == undefined) return <></>;

  async function addFriendHandle() {
    toast.normal("Please wait a moment");
    const response = await userService.addFriend({
      friendId: friend.id,
      userId: user.id,
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
                <AvatarImage
                  src={friend.profilePictureLink}
                  alt={friend.name}
                />
                <AvatarFallback>
                  {getFirstTwoInitials(friend.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-lg text-black line-clamp-1">
                  {friend.name}
                </div>
                <div className="text-sm text-gray-500 line-clamp-1">
                  {friend.email}
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
                  <AvatarImage
                    src={friend.profilePictureLink}
                    alt={friend.name}
                  />
                  <AvatarFallback>
                    {getFirstTwoInitials(friend.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-lg text-black line-clamp-1">
                    {friend.name}
                  </div>
                  <div className="text-sm text-gray-500 line-clamp-1">
                    {friend.email}
                  </div>
                </div>
              </div>
            </DialogTitle>
            <DialogDescription>
              {friend.description == ""
                ? "User's description not filled"
                : friend.description}
            </DialogDescription>
          </DialogHeader>
          {isFriend ? (
            <FriendProfile friend={friend} />
          ) : (
            <UserProfile user={friend} />
          )}
          {isFriend ? (
            <></>
          ) : (
            <DialogFooter>
              <Button type="submit" onClick={() => addFriendHandle()}>
                Add Friend
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
export default FriendCard;
