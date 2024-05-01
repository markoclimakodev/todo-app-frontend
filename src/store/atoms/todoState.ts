import { ITodo } from "@/interface/todo/ITodo";
import { atom } from "recoil";

export const todoState = atom({
    key: 'todos',
    default: <ITodo[]>[] 
})