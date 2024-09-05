import { IGroup } from "@/app/interfaces/group-interface";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GroupInformation from "./group-information";
import ChatGroup from "./chat-group";

interface I {
  group: IGroup;
}

function GroupTab({ group }: I) {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="information">Information</TabsTrigger>
        <TabsTrigger value="chat">Chat</TabsTrigger>
      </TabsList>
      <TabsContent value="information">
        <GroupInformation group={group} />
      </TabsContent>
      <TabsContent value="chat">
        <ChatGroup group={group}></ChatGroup>
      </TabsContent>
    </Tabs>
  );
}

export default GroupTab;
