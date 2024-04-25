import { Router } from 'express'
import { AuthenticationMiddleware } from '../../../middlewares/AuthenticationMiddleware'
import { createTodoRoutes } from './createTodo.routes'
import { getTodosRoutes } from './getTodos.routes'
import { updateTodoRoutes } from './updateTodo.routes'
import { deleteTodoRoutes } from './deleteTodo.routes'
import { addImportantRoutes } from './addImportant.routes'
import { getImportantsTodosRoutes } from './getImportantsTodos.routes'
import { getCompletedTodosRoutes } from './getCompletedTodos.routes'
import { getTodoByIdRoutes } from './getTodoById.routes'

const todoRoutes = Router()
const authenticateToken = AuthenticationMiddleware.authenticateToken

todoRoutes.use( authenticateToken )

todoRoutes.use( '/create' , createTodoRoutes )

todoRoutes.use( '/get' , getTodosRoutes )

todoRoutes.use( '/important' , getImportantsTodosRoutes )

todoRoutes.use( '/completed' , getCompletedTodosRoutes )

todoRoutes.use( '/todo-id' , getTodoByIdRoutes )

todoRoutes.use( '/update' , updateTodoRoutes )

todoRoutes.use( '/important' , addImportantRoutes )

todoRoutes.use( '/delete' , deleteTodoRoutes )

export default todoRoutes
