import { ICategory } from "@/interface/category/ICategory";
import { atom } from "recoil";

export const categoryState = atom({
    key: 'category',
    default: <ICategory[]>[] 
})