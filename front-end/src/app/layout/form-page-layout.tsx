import { IChildren } from "../interfaces/children-interface";

function FormPageLayout({ children }: IChildren) {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="border border-neutral-500 p-6 border-2 rounded-md w-1/4">
        {children}
      </div>
    </div>
  );
}

export default FormPageLayout;
