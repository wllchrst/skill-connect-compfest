import FormPageLayout from "@/app/layout/form-page-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

function LoginPage() {
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
        <div className="flex flex-col items-center gap-2">
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />
          <Button className="mt-3">Login</Button>
        </div>
      </div>
    </FormPageLayout>
  );
}

export default LoginPage;
