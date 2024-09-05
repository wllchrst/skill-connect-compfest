"use client";

import { IChildren } from "@/app/interfaces/children-interface";
import Navbar from "@/app/components/navbar/navbar";
import useGetUserInformation from "../hooks/use-get-user-information";
import { useUserContext } from "../contexts/user-context";
import { useRouter } from "next/navigation";
import UserMiddleware from "../middleware/user-middleware";
import LoadingPage from "../components/loading-page";

function MainPageLayout({ children }: IChildren) {
  const { user } = useUserContext();
  const { isLoading } = useGetUserInformation();
  const router = useRouter();

  if (isLoading) return <LoadingPage />;
  else if (user == null) router.push("/pages/login");
  else if (!user.filledInformation) router.push("/pages/welcome");

  return (
    <UserMiddleware>
      <div className={"h-screen flex justify-between gap-3 p-4 "}>
        <div className={"w-1/6 rounded-md p-2 bg-[#212121]"}>
          <Navbar />
        </div>
        <div
          className={
            " w-5/6 rounded-md bg-[#212121] overflow-x-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent"
          }
        >
          {children}
        </div>
      </div>
    </UserMiddleware>
  );
}

export default MainPageLayout;
