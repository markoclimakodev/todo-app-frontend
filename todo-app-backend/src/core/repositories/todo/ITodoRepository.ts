import { IAddImportant } from '../../interfaces/Todo/IAddImportant'
import { ICreateTodo } from '../../interfaces/Todo/ICreateTodo'
import { IDeleteTodo } from '../../interfaces/Todo/IDeleteTodo'
import { IGetCompletedTodos } from '../../interfaces/Todo/IGetCompletedTodos'
import { IGetImportantsTodos } from '../../interfaces/Todo/IGetImportantsTodos'
import { IGetTodos } from '../../interfaces/Todo/IGetTodos'
import { ITodo } from '../../interfaces/Todo/ITodo'
import { IUpdateTodo } from '../../interfaces/Todo/IUpdateTodo'

export interface ITodoRepository {
    createTodo( params: ICreateTodo ): Promise<void>
    getTodos( params: IGetTodos ): Promise<ITodo[]>
    getImportantsTodos( params: IGetImportantsTodos ): Promise<ITodo[]>
    getCompletedTodos ( params: IGetCompletedTodos ) : Promise<ITodo[]>
    updateTodo( params: IUpdateTodo ): Promise<void>
    addImportant( params: IAddImportant ): Promise<void>
    deleteTodo( params: IDeleteTodo ) :Promise<void>
}
