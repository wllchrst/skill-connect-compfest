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
import { lazy, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Vertical from "../../components/welcome/vertical";
import useGetUserInformation from "@/app/hooks/use-get-user-information";

function validateData(user: IUser): string {
  if (
    user.description == "" ||
    user.dateOfBirth == null ||
    user.profilePictureLink == "" ||
    user.language == "" ||
    user.currentEducation == "" ||
    user.experienceYears <= 0 ||
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
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedLearningResources, setSelectedLearningResources] = useState<
    string[]
  >([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const { user } = useUserContext();
  const form = useForm<IUser>();
  const register = form.register;
  const toast = new ToastBuilder("Welcome Page");
  const router = useRouter();

  useEffect(() => {
    const currUser = user as IUser;
    if (currUser) {
      if (user.filledInformation) router.push("/pages/home");
    }
  }, [user]);

  const handleSkillChange = (skill: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedSkills([...selectedSkills, skill]);
    } else {
      setSelectedSkills(selectedSkills.filter((item) => item !== skill));
    }
    form.setValue("skill", selectedSkills);
  };

  const handleInterestChange = (interest: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedInterests([...selectedInterests, interest]);
    } else {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest)
      );
    }
    form.setValue("interest", selectedInterests);
  };

  const handleLearningResourceChange = (
    resource: string,
    isChecked: boolean
  ) => {
    if (isChecked) {
      setSelectedLearningResources([...selectedLearningResources, resource]);
    } else {
      setSelectedLearningResources(
        selectedLearningResources.filter((item) => item !== resource)
      );
    }
    form.setValue("learningResource", selectedLearningResources);
  };

  const handleToolChange = (tool: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedTools([...selectedTools, tool]);
    } else {
      setSelectedTools(selectedTools.filter((item) => item !== tool));
    }
  };

  const handleLanguageChange = (language: string) => {
    form.setValue("language", language);
  };

  const handleEducationChange = (education: string) => {
    form.setValue("currentEducation", education);
  };

  const submitHandler: SubmitHandler<IUser> = (data) => {
    data.email = user.email;
    data.id = user.id;
    data.name = user.name;
    data.profilePictureLink = imageLink;
    data.interest = selectedInterests;
    data.skill = selectedSkills;
    data.learningResource = selectedLearningResources;
    data.tools = selectedTools;
    data.experienceYears = parseInt(data.experienceYears.toString());

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
        } else {
          toast.destructive(result.message);
        }
      });
    } catch (error) {
      console.error(error);
      toast.destructive(`Something went wrong: ${error}`);
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
            <Select onValueChange={(value) => handleLanguageChange(value)}>
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
            <Select onValueChange={(value) => handleEducationChange(value)}>
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
            <Input
              {...register("experienceYears")}
              placeholder="Experience in year(s)"
              type="number"
            />
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
                  <WelcomeCheckbox
                    label={skill}
                    key={index}
                    onCheckedChange={(checked) =>
                      handleSkillChange(skill, checked)
                    }
                  />
                ))}
              </div>
            </Vertical>
            <Vertical>
              <Label className="text-lg font-semibold">Interests</Label>
              <div className="flex flex-wrap gap-2">
                {interestType.map((interest, index) => (
                  <WelcomeCheckbox
                    label={interest}
                    key={index}
                    onCheckedChange={(checked) =>
                      handleInterestChange(interest, checked)
                    }
                  />
                ))}
              </div>
            </Vertical>
            <Vertical>
              <Label className="text-lg font-semibold">
                Learning Resources
              </Label>
              <div className="flex flex-wrap gap-2">
                {learningResources.map((resource, index) => (
                  <WelcomeCheckbox
                    label={resource}
                    key={index}
                    onCheckedChange={(checked) =>
                      handleLearningResourceChange(resource, checked)
                    }
                  />
                ))}
              </div>
            </Vertical>
            <Vertical>
              <Label className="text-lg font-semibold">Tools</Label>
              <div className="flex flex-wrap gap-2">
                {toolTypes.map((tool, index) => (
                  <WelcomeCheckbox
                    label={tool}
                    key={index}
                    onCheckedChange={(checked) =>
                      handleToolChange(tool, checked)
                    }
                  />
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
