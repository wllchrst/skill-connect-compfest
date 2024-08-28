"use client";
import ToastBuilder from "@/app/builder/toast-builder";
import { ILoginUser } from "@/app/interfaces/login-user-interface";
import FormPageLayout from "@/app/layout/form-page-layout";
import UserService from "@/app/service/user-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/contexts/user-context";
import useGetUserInformation from "@/app/hooks/use-get-user-information";
import Loading from "@/app/components/loading";
import { home_path } from "@/app/data/page-paths";

function validateLoginData(loginUser: ILoginUser): string {
  if (loginUser.email == "" || loginUser.password == "")
    return "Every field is required";

  return "";
}

const userService = new UserService();

function LoginPage() {
  const { register, handleSubmit } = useForm<ILoginUser>();
  const toast = new ToastBuilder("Login");
  const { user, isLoading } = useGetUserInformation();
  const router = useRouter();

  if (user != null) router.push(home_path);

  if (isLoading) return <Loading />;

  const submitHandle: SubmitHandler<ILoginUser> = (data) => {
    const validationMessage = validateLoginData(data);
    if (validationMessage != "") {
      toast.destructive(validationMessage);
      return;
    }

    try {
      userService.loginUser(data).then((result) => {
        if (result.success) {
          toast.normal("Login Successful");
          Cookies.set("token", result.data);
          router.push("/pages/home");
        }
      });
    } catch (error) {
      console.error(error);
      toast.destructive(`Something went wrong: ${error}`);
    }
  };

  return (
    <FormPageLayout>
      <div className="flex flex-col gap-3">
        <div className="mb-3">
          <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Welcome Back to Skill Connect!
          </h2>
          <p className="text-sm text-muted-foreground">
            You need to login first to your account before using the website.{" "}
            <Link href={"/pages/register"} className="underline">
              Click here
            </Link>{" "}
            if you do not have an account
          </p>
        </div>
        <form onSubmit={handleSubmit(submitHandle)}>
          <div className="flex flex-col items-center gap-2">
            <Input placeholder="Email" type="email" {...register("email")} />
            <Input
              placeholder="Password"
              type="password"
              {...register("password")}
            />
            <Button className="mt-3">Login</Button>
          </div>
        </form>
      </div>
    </FormPageLayout>
  );
}

export default LoginPage;
