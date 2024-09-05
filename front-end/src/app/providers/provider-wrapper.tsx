import { Toaster } from "@/components/ui/toaster";
import { IChildren } from "../interfaces/children-interface";
import ThemeProvider from "./theme-provider";
import UserContextProvider from "./user-context-provider";
import RealtimeContextProvider from "./realtime-context-provider";

function ProviderWrapper({ children }: IChildren) {
  return (
    <>
      <ThemeProvider>
        <RealtimeContextProvider>
          <UserContextProvider>{children}</UserContextProvider>
        </RealtimeContextProvider>
      </ThemeProvider>
      <Toaster />
    </>
  );
}

export default ProviderWrapper;
