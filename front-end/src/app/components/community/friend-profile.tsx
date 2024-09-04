import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IUser } from "@/app/interfaces/user-interface";
import UserProfile from "./user-profile";
interface I {
  user: IUser;
}

function FriendProfile({ user }: I) {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="chat">Chat</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <UserProfile user={user} />
      </TabsContent>
      <TabsContent value="password"></TabsContent>
    </Tabs>
  );
}

export default FriendProfile;
