import { Toaster } from "@/components/ui/toaster";
import { IChildren } from "../interfaces/children-interface";
import ThemeProvider from "./theme-provider";

function ProviderWrapper({ children }: IChildren) {
  return (
    <>
      <ThemeProvider>{children}</ThemeProvider>
      <Toaster />
    </>
  );
}

export default ProviderWrapper;
