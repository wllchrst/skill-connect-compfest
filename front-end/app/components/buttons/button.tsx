import { useThemeContext } from "@/app/context/theme-context";
import { IButton } from "@/app/interfaces/button-prop-interface";
export default function Button({ children, onClick }: IButton) {
    const { theme } = useThemeContext()
    const background = `bg-${theme.primary}-500`

    console.log(background)

    return <button onClick={onClick} className={`${background} border border-black p-2 rounded-md`}>
        {children}
    </button>
}