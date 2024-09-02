"use client";
import ToastBuilder from "@/app/builder/toast-builder";
import { useUserContext } from "@/app/contexts/user-context";
import { ICreateUser } from "@/app/interfaces/create-user-interface";
import FormPageLayout from "@/app/layout/form-page-layout";
import UserService from "@/app/service/user-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

function validateCreateUserData(data: ICreateUser): string {
  if (data.email == "" || data.name == "" || data.password == "")
    return "Every field is required";
  else if (data.name.length < 3) return "Name length cannot be less than 3";

  return "";
}

const userService = UserService.getInstance();

function RegisterPage() {
  const { user } = useUserContext();
  const { register, handleSubmit } = useForm<ICreateUser>();
  const toast = new ToastBuilder("Registering your account");
  const router = useRouter();

  if (user != null) router.push("/pages/home");

  const onSubmit: SubmitHandler<ICreateUser> = (data) => {
    const validationMessage = validateCreateUserData(data);
    if (validationMessage != "") {
      toast.destructive(validationMessage);
      return;
    }
    toast.normal("Please wait a moment");
    try {
      userService.registerUser(data).then((result) => {
        if (result.data) {
          toast.normal("Successful");
          router.push("/pages/login");
        }
      });
    } catch (error) {
      console.error(error);
      toast.destructive(`Something went wrong: ${error}`);
    }
  };

  return (
    <FormPageLayout>
      <div className="flex flex-col gap-3 w-full">
        <div className="mb-3">
          <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Create your account
          </h2>
          <p className="text-sm text-muted-foreground">
            You need to create an account first before using the website,{" "}
            <Link href={"/pages/login"} className="underline">
              Click here
            </Link>{" "}
            if you already have an account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 items-center">
            <Input placeholder="Email" type="email" {...register("email")} />
            <Input placeholder="Fullname" type="text" {...register("name")} />
            <Input
              placeholder="Password"
              type="password"
              {...register("password")}
            />
            <Button type="submit" className="w-1/3 mt-3">
              Register
            </Button>
          </div>
        </form>
      </div>
    </FormPageLayout>
  );
}

export default RegisterPage;
