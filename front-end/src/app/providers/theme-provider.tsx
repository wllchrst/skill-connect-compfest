import { IChildren } from "../interfaces/children-interface";

function ThemeProvider({ children }: IChildren) {
  return <div className="bg-black text-white">{children}</div>;
}

export default ThemeProvider;
