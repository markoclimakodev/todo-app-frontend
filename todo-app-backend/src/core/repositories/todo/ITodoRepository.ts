import { ICreateTodo } from '../../interfaces/Todo/ICreateTodo'
import { IGetTodos } from '../../interfaces/Todo/IGetTodos'
import { ITodo } from '../../interfaces/Todo/ITodo'
import { IUpdateTodo } from '../../interfaces/Todo/IUpdateTodo'

export interface ITodoRepository {
    createTodo( params: ICreateTodo ): Promise<void>
    getTodos( params: IGetTodos ): Promise<ITodo[]>
    updateTodo( params: IUpdateTodo ): Promise<void>
}
