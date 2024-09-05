import { useRouter } from "next/router";
import Loading from "../components/loading";
import useGetUserInformation from "../hooks/use-get-user-information";
import { IChildren } from "../interfaces/children-interface";
import UserMiddleware from "../middleware/user-middleware";
import { useUserContext } from "../contexts/user-context";

function LandingPageLayout({ children }: IChildren) {
  const { user } = useUserContext();
  const { isLoading } = useGetUserInformation();

  if (isLoading) return <Loading />;

  return (
    <UserMiddleware>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="border-neutral-500 p-6 border-2 rounded-md w-1/3">
          {children}
        </div>
      </div>
    </UserMiddleware>
  );
}

export default LandingPageLayout;
