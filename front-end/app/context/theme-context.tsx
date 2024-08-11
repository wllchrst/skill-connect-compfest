import { createContext, useContext, useState } from "react";
import { ITheme, IThemeContext } from "../interfaces/theme-context.interface";
import { IChildren } from "../interfaces/children-interface";
import { ThemeMode } from "../enums/theme-enum";
import { darkTheme, lightTheme } from "../config/theme-configuration";

const themeContext = createContext<IThemeContext>({} as IThemeContext);

export function useThemeContext() {
    return useContext(themeContext)
}

export function ThemeContextProvider({ children }: IChildren) {
    const [theme, setTheme] = useState<ITheme>(darkTheme)
    const [themeMode, setThemeMode] = useState(ThemeMode.dark)

    function changeTheme(themeMode: ThemeMode) {
        if (themeMode == ThemeMode.dark) setTheme(darkTheme)
        else if (themeMode == ThemeMode.light) setTheme(lightTheme)

        setThemeMode(themeMode)
    }

    const contextValue = {
        theme: theme,
        currentTheme: themeMode,
        changeTheme: changeTheme
    }

    return <themeContext.Provider value={contextValue}>
        {children}
    </themeContext.Provider>
}