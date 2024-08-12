"use client";
import { ThemeContextProvider } from "../context/theme-context";
import { IChildren } from "../interfaces/children-interface";
import MainLayout from "./main-layout";


export default function BodyLayout({ children }: IChildren) {
    return <>
        <ThemeContextProvider>
            <MainLayout>
                {children}
            </MainLayout>
        </ThemeContextProvider>
    </>
}