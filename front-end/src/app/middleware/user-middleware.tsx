import { usePathname, useRouter } from "next/navigation";
import useGetUserInformation from "../hooks/use-get-user-information";
import { IChildren } from "../interfaces/children-interface";
import { NextRequest } from "next/server";
import LoadingPage from "../components/loading-page";

function UserMiddleware({ children }: IChildren, request: NextRequest) {
  const { user, isLoading } = useGetUserInformation();
  const router = useRouter();
  const pathName = usePathname();

  if (isLoading) return <LoadingPage />;
  else if (
    user == null &&
    pathName != "/pages/login" &&
    pathName != "/pages/register"
  ) {
    // NextResponse.redirect(new URL("/pages/home", request.url));
    router.push("/pages/login");
  }

  return <>{children}</>;
}

export default UserMiddleware;
