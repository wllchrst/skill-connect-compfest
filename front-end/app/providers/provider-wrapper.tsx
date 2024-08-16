import { IChildren } from "../interfaces/children-interface";
import UIProvider from "./ui-providers";

export default function ProviderWrapper({children} : IChildren){
    return <>
        <UIProvider>
            {children}
        </UIProvider>
    </>
}