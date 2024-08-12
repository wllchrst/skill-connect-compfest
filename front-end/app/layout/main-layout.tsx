import { useThemeContext } from "../context/theme-context";
import { IChildren } from "../interfaces/children-interface";

export default function MainLayout({ children }: IChildren) {
    const themeContext = useThemeContext();
    console.log(themeContext.theme)

    return <div className={`${themeContext.theme.backgroundColor} ${themeContext.theme.textColor}`}>
        {children}
    </div>
}   