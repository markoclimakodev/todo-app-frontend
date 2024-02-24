import { ICreateTodo } from './ICreateTodo'

export interface IUpdateTodo {
    updateInfo: Partial<ICreateTodo> ,
    id: string
}
