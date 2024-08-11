import { useThemeContext } from "../context/theme-context";
import { IChildren } from "../interfaces/children-interface";

export default function MainLayout({ children }: IChildren) {
    const themeContext = useThemeContext();

    return <div className={`bg-[${themeContext.theme.backgroundColor}]`}>
        {children}
    </div>
}