"use client";

import ToastBuilder from "@/app/builder/toast-builder";
import { useUserContext } from "@/app/contexts/user-context";
import { educationTypes } from "@/app/data/education-data-types";
import {
  humanLanguages,
  interestType,
  learningResources,
  toolTypes,
} from "@/app/data/user-data-types";
import { postImage } from "@/app/helpers/file-helper";
import { IUser } from "@/app/interfaces/user-interface";
import LandingPageLayout from "@/app/layout/landing-page-layout";
import UserService from "@/app/service/user-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SelectValue } from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

function validateData(user: IUser): string {
  if (
    user.description == "" ||
    user.dateOfBirth == null ||
    user.profilePictureLink == "" ||
    user.language == "" ||
    user.skill == "" ||
    user.interest.length == 0 ||
    user.learningResource.length == 0 ||
    user.tools.length == 0
  )
    return "All fields are required";

  return "";
}

const userService = UserService.getInstance();

function WelcomePage() {
  const [imageLink, setImageLink] = useState<string>("");
  const { user } = useUserContext();
  const { register, handleSubmit } = useForm<IUser>();
  const toast = new ToastBuilder("Welcome Page");
  const router = useRouter();

  // if (user.filledInformation) router.push("/pages/home");

  const submitHandler: SubmitHandler<IUser> = (data) => {
    data.profilePictureLink = imageLink;
    const validationMessage = validateData(data);
    if (validationMessage != "") {
      toast.destructive(validationMessage);
      return;
    }

    try {
      userService.updateUser(data).then((result) => {
        if (result.success) {
          toast.normal("Information updated successfully");
          router.push("/pages/home");
        }
      })
    } catch (error) {

    }
  };

  return (
    <LandingPageLayout>
      <div className="flex flex-col gap-2 scroll-m-20 tracking-tight">
        <h3 className="text-xl font-semibold">Hi, Welcome to Skill Connect!</h3>
        <h3 className="text-md font-normal mb-3">
          To improve the quality of your experience while using the website,
          please fill in some information.
        </h3>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(submitHandler)}>
          <Input
            placeholder="Image"
            onChange={async (e) => {
              const file = e.target.files![0];
              if (file) setImageLink(await postImage(file));
            }}
            type="file"
          />
          <Textarea
            placeholder="Describe yourself.."
            {...register("description")}
          />
          <Input
            placeholder="Date of Birth"
            type="date"
            {...register("dateOfBirth")}
          />
          <Select {...register("language")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a language.." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                {humanLanguages.map((language, index) => (
                  <SelectItem key={index} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select {...register("skill")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a skill.." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Skill</SelectLabel>
                {interestType.map((skill, index) => (
                  <SelectItem key={index} value={skill}>
                    {skill}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select {...register("currentEducation")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select current education.." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Education</SelectLabel>
                {educationTypes.map((education, index) => (
                  <SelectItem key={index} value={education}>
                    {education}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input placeholder="Experience in year(s)" type="number" />
          <Select {...register("interest")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an interest.." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Interest</SelectLabel>
                {interestType.map((interest, index) => (
                  <SelectItem key={index} value={interest}>
                    {interest}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select {...register("learningResource")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a learning resource.." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Learning Resource</SelectLabel>
                {learningResources.map((resource, index) => (
                  <SelectItem key={index} value={resource}>
                    {resource}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select {...register("tools")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a tool.." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tools</SelectLabel>
                {toolTypes.map((tool, index) => (
                  <SelectItem key={index} value={tool}>
                    {tool}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </LandingPageLayout>
  );
}

export default WelcomePage;
