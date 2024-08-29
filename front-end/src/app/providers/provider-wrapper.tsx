import { Toaster } from "@/components/ui/toaster";
import { IChildren } from "../interfaces/children-interface";
import ThemeProvider from "./theme-provider";
import UserContextProvider from "./user-context-provider";

function ProviderWrapper({ children }: IChildren) {
  return (
    <>
      <ThemeProvider>
        <UserContextProvider>{children}</UserContextProvider>
      </ThemeProvider>
      <Toaster />
    </>
  );
}

export default ProviderWrapper;
