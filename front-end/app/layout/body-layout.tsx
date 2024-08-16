"use client";
import { ThemeContextProvider } from "../context/theme-context";
import { IChildren } from "../interfaces/children-interface";
import ProviderWrapper from "../providers/provider-wrapper";
import MainLayout from "./main-layout";


export default function BodyLayout({ children }: IChildren) {
    return <>
        <ProviderWrapper>
            {children}
        </ProviderWrapper>
    </>
}