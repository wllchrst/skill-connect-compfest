import FormPageLayout from "@/app/layout/form-page-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

function RegisterPage() {
  return (
    <FormPageLayout>
      <div className="flex flex-col gap-3">
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

        <div className="flex flex-col gap-2 items-center">
          <Input placeholder="Email" type="email" />
          <Input placeholder="Fullname" type="text" />
          <Input placeholder="Password" type="password" />
          <Button className="w-1/3 mt-3">Register</Button>
        </div>
      </div>
    </FormPageLayout>
  );
}

export default RegisterPage;
