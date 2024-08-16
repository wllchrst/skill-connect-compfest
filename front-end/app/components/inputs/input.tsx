import { IInput } from "@/app/interfaces/input-prop-interface";

export default function Input({ placeholder }: IInput) {
    return <input placeholder={placeholder} className=""/>
}