"use client";

import ToastBuilder from "@/app/builder/toast-builder";
import { useUserContext } from "@/app/contexts/user-context";
import { ICreateGroup } from "@/app/interfaces/create-group-interface";
import { CourseService } from "@/app/service/course-service";
import GroupService from "@/app/service/group-service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";

export function CreateGroup() {
  const groupService = new GroupService();
  const { register, handleSubmit } = useForm<ICreateGroup>();
  const { user } = useUserContext();
  const toast = new ToastBuilder("Creating group");

  const submitHandle: SubmitHandler<ICreateGroup> = (data) => {
    toast.normal("Creating group please wait");
    groupService.createGroup(data, user.id).then((result) => {
      if (result.success) toast.normal(result.message);
      else toast.destructive(result.message);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">New Group!</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
          <DialogDescription>
            Groups will be a good place for you to start a bigger community to
            learn together for faster results.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(submitHandle)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Group Name
              </Label>
              <Input
                id="name"
                defaultValue=""
                className="col-span-3"
                {...register("groupName")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Textarea
                id="username"
                defaultValue=""
                className="col-span-3"
                {...register("description")}
              />
            </div>
          </div>

          <Button type="submit">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
