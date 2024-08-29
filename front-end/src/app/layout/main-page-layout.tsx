"use client";

import { IChildren } from "@/app/interfaces/children-interface";
import Navbar from "@/app/components/navbar/navbar";
import useGetUserInformation from "../hooks/use-get-user-information";
import Loading from "../components/loading";
import { useUserContext } from "../contexts/user-context";

function MainPageLayout({ children }: IChildren) {
  const { user } = useUserContext();
  const { isLoading } = useGetUserInformation();

  if (isLoading && user == null) return <Loading />;

  return (
    <div className={"h-screen flex justify-between gap-3 p-4 "}>
      <div className={"w-[300px] rounded-md p-2 bg-[#212121]"}>
        <Navbar />
      </div>
      <div className={" w-[100%] rounded-md p-2 bg-[#212121]"}>{children}</div>
    </div>
  );
}

export default MainPageLayout;
