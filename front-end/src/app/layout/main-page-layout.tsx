"use client";

import { IChildren } from "@/app/interfaces/children-interface";
import Navbar from "@/app/components/navbar/navbar";
import useGetUserInformation from "../hooks/use-get-user-information";
import Loading from "../components/loading";
import { useUserContext } from "../contexts/user-context";
import { useRouter } from "next/navigation";
import UserMiddleware from "../middleware/user-middleware";

function MainPageLayout({ children }: IChildren) {
  const { user } = useUserContext();
  const { isLoading } = useGetUserInformation();
  const router = useRouter();

  if (isLoading && user == null) return <Loading />;
  else if (!user.filledInformation) router.push("/pages/welcome");

  return (
    <UserMiddleware>
      <div className={"h-screen flex justify-between gap-3 p-4 "}>
        <div className={"w-[300px] rounded-md p-2 bg-[#212121]"}>
          <Navbar />
        </div>
        <div className={" w-[100%] rounded-md p-2 bg-[#212121]"}>
          {children}
        </div>
      </div>
    </UserMiddleware>
  );
}

export default MainPageLayout;
