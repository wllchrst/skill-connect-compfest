"use client";

import ToastBuilder from "@/app/builder/toast-builder";
import WelcomeCheckbox from "@/app/components/welcome/checkbox";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { SelectValue } from "@radix-ui/react-select";
import { formToJSON } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Vertical from "../../components/welcome/vertical";

function validateData(user: IUser): string {
  if (
    user.description == "" ||
    user.dateOfBirth == null ||
    user.profilePictureLink == "" ||
    user.language == "" ||
    user.skill.length == 0 ||
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
  const [componentState, setComponentState] = useState<"first" | "second">(
    "first"
  );
  const { user } = useUserContext();
  const form = useForm<IUser>();
  const register = form.register;
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
      });
    } catch (error) {}
  };

  return (
    <LandingPageLayout>
      <div className="flex flex-col gap-2 scroll-m-20 tracking-tight">
        <h3 className="text-xl font-semibold">Hi, Welcome to Skill Connect!</h3>
        <h3 className="text-md font-normal mb-3">
          To improve the quality of your experience while using the website,
          please fill in some information.
        </h3>
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <div
            className={`flex flex-col gap-3 ${
              componentState !== "first" ? "hidden" : ""
            }`}
          >
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
              placeholder="Date of birth"
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
            <Button type="button" onClick={() => setComponentState("second")}>
              Next
            </Button>
          </div>
          <div
            className={`flex flex-col gap-3 w-full ${
              componentState !== "second" ? "hidden" : ""
            }`}
          >
            <Vertical>
              <Label className="text-lg font-semibold">Skills</Label>
              <div className="flex flex-wrap gap-2">
                {interestType.map((skill, index) => (
                  <WelcomeCheckbox label={skill} key={index} />
                ))}
              </div>
            </Vertical>
            <Vertical>
              <Label className="text-lg font-semibold">Interests</Label>
              <div className="flex flex-wrap gap-2">
                {interestType.map((interest, index) => (
                  <WelcomeCheckbox label={interest} key={index} />
                ))}
              </div>
            </Vertical>
            <Vertical>
              <Label className="text-lg font-semibold">Learning Resources</Label>
              <div className="flex flex-wrap gap-2">
                {learningResources.map((resource, index) => (
                  <WelcomeCheckbox label={resource} key={index} />
                ))}
              </div>
            </Vertical>
            <Vertical>
              <Label className="text-lg font-semibold">Tools</Label>
              <div className="flex flex-wrap gap-2">
                {toolTypes.map((tool, index) => (
                  <WelcomeCheckbox label={tool} key={index} />
                ))}
              </div>
            </Vertical>
            <div className="flex gap-2 w-full">
              <Button type="button" onClick={() => setComponentState("first")}>
                Back
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </div>
    </LandingPageLayout>
  );
}

export default WelcomePage;
