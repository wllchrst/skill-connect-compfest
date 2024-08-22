import { IChildren } from "../interfaces/children-interface";
import ThemeProvider from "./theme-provider";

function ProviderWrapper({ children }: IChildren) {
  return (
    <>
      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
}

export default ProviderWrapper;
