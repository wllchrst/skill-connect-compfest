import { IChildren } from "../interfaces/children-interface";
import UserMiddleware from "../middleware/user-middleware";

function FormPageLayout({ children }: IChildren) {
  return (
    <UserMiddleware>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="border-neutral-500 p-6 border-2 rounded-md w-1/4">
          {children}
        </div>
      </div>
    </UserMiddleware>
  );
}

export default FormPageLayout;
