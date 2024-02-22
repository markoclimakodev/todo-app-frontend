import { Todos } from '@prisma/client'
import { ITodo } from '../interfaces/Todo/ITodo'
import { IInfoToUpdate } from '../interfaces/Todo/IInfoToUpdate'

export interface ITodoRepository {
    createTodo( todoData: ITodo ): Promise<void>
    getTodos( id:string ):Promise<Todos[]>
    updateTodo( infoToUpdate: IInfoToUpdate ): Promise<void>
    deleteTodo( id: string ): Promise<void>
}
