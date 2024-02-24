import { Todos } from '@prisma/client'
import { IUpdateTodo } from '../../interfaces/Todo/IUpdateTodo'
import { ICreateTodo } from '../../interfaces/Todo/ICreateTodo'
import { IGetTodo } from '../../interfaces/Todo/IGetTodo'

export interface ITodoRepository {
    createTodo( params: ICreateTodo ): Promise<void>
    getTodos( params:IGetTodo ):Promise<Todos[]>
    updateTodo( params: IUpdateTodo ): Promise<void>
    deleteTodo( id: string ): Promise<void>
}
