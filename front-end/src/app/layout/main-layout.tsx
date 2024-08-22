import { IChildren } from "../interfaces/children-interface";
import ProviderWrapper from "../providers/provider-wrapper";

function MainLayout({ children }: IChildren) {
  return (
    <div className="">
      <ProviderWrapper>{children}</ProviderWrapper>
    </div>
  );
}

export default MainLayout;
