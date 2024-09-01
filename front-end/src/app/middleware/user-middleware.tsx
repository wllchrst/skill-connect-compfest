import { useRouter } from "next/navigation";
import Loading from "../components/loading";
import useGetUserInformation from "../hooks/use-get-user-information";
import { IChildren } from "../interfaces/children-interface";
import { NextRequest, NextResponse } from "next/server";

function UserMiddleware({ children }: IChildren, request: NextRequest) {
  const { user, isLoading } = useGetUserInformation();

  if (isLoading) return <Loading />;
  else if (user == null) {
    NextResponse.redirect(new URL("/pages/home", request.url));
  }

  return <>{children}</>;
}

export default UserMiddleware;
