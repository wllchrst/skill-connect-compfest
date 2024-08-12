import { ThemeMode } from "../enums/theme-enum"

export interface ITheme {
    backgroundColor: string
    textColor: string
    primary: string
}

export interface IThemeContext {
    theme: ITheme
    currentTheme: ThemeMode
    changeTheme: (themeMode: ThemeMode) => void
}