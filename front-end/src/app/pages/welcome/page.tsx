"use client";

import { useUserContext } from "@/app/contexts/user-context";
import FormPageLayout from "@/app/layout/form-page-layout";
import { useRouter } from "next/navigation";

function WelcomePage() {
  const { user } = useUserContext();
  const router = useRouter();

  if (user.filledInformation) router.push("/pages/home");

  return (
    <FormPageLayout>
      <div>
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight ">
          Hi, Welcome to Skill Connect, a community that we are building to
          create an environment for learning a growing field that is Artificial
          Intelligence, to improve the quality of your experience while using
          the website you need to fill in some information
        </h3>
      </div>
    </FormPageLayout>
  );
}

export default WelcomePage;
