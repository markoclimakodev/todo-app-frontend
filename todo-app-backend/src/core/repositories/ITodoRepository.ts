import { Todos } from '@prisma/client'
import { ITodo } from '../interfaces/Todo/ITodo'
import { IInfoToUpdate } from '../interfaces/Todo/IInfoToUpdate'
import { IGetTodo } from '../interfaces/Todo/IGetTodo'

export interface ITodoRepository {
    createTodo( todoData: ITodo ): Promise<void>
    getTodos( getTodoParams:IGetTodo ):Promise<Todos[]>
    updateTodo( infoToUpdate: IInfoToUpdate ): Promise<void>
    deleteTodo( id: string ): Promise<void>
}
