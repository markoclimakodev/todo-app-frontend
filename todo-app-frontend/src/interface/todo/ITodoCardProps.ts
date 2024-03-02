import { ITodo } from "./ITodo";

export interface ITodoCardProps {
    todo: ITodo,
    handleDeleteTodo: () => void
}