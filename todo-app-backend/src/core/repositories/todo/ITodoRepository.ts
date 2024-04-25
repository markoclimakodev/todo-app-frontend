import { IAddImportant } from '../../interfaces/Todo/IAddImportant'
import { ICreateTodo } from '../../interfaces/Todo/ICreateTodo'
import { IDeleteTodo } from '../../interfaces/Todo/IDeleteTodo'
import { IGetTodoStatus } from '../../interfaces/Todo/IGetTodoStatus'
import { IGetTodoById } from '../../interfaces/Todo/IGetTodoById'
import { IGetTodos } from '../../interfaces/Todo/IGetTodos'
import { ITodo } from '../../interfaces/Todo/ITodo'
import { IUpdateTodo } from '../../interfaces/Todo/IUpdateTodo'
import { IAddCompleted } from '../../interfaces/Todo/IAddCompleted'

export interface ITodoRepository {
    createTodo( params: ICreateTodo ): Promise<void>
    getTodos( params: IGetTodos ): Promise<ITodo[]>
    getImportantsTodos( params: IGetTodoStatus ): Promise<ITodo[]>
    getCompletedTodos ( params: IGetTodoStatus ) : Promise<ITodo[]>
    getTodoById( params: IGetTodoById ): Promise<ITodo>
    updateTodo( params: IUpdateTodo ): Promise<void>
    addImportant( params: IAddImportant ): Promise<void>
    addCompleted( params: IAddCompleted ): Promise<void>
    deleteTodo( params: IDeleteTodo ) :Promise<void>
}
