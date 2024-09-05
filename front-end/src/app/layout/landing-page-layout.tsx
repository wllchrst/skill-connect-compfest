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
      <div className="min-h-screen min-w-screen flex justify-center items-center py-10">
        <div className="border-neutral-500 p-6 border-2 rounded-md w-1/3 max-h-full overflow-auto">
          {children}
        </div>
      </div>
    </UserMiddleware>
  );
}

export default LandingPageLayout;
