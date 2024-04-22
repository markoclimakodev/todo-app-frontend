import { ITheme } from "@/interface/ITheme";
import { atom } from "recoil";

export const themeState = atom({
    key: 'theme',
    default: <ITheme> {theme: "dark"}
})