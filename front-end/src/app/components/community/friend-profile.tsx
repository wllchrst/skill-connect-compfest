import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IUser } from "@/app/interfaces/user-interface";
import UserProfile from "./user-profile";
import { useUserContext } from "@/app/contexts/user-context";
import ChatFriend from "./chat-friend";
import Loading from "../loading";
interface I {
  friend: IUser;
}

function FriendProfile({ friend }: I) {
  const { user } = useUserContext();

  if (user == null) return <Loading />;

  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="chat">Chat</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <UserProfile user={friend} />
      </TabsContent>
      <TabsContent value="chat">
        <ChatFriend friend={friend} user={user} />
      </TabsContent>
    </Tabs>
  );
}

export default FriendProfile;
