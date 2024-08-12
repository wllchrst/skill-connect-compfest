import { useThemeContext } from "../context/theme-context";
import { IChildren } from "../interfaces/children-interface";

export default function FullScreenCenterLayout ({children} : IChildren) {
    const themeContext = useThemeContext();
    console.log(themeContext.theme.backgroundColor)    

    return <div className={`w-screen h-screen flex justify-center items-center p-8`}>
        <div className="border w-full h-full rounded-md">
            {children}
        </div>
    </div>
}