import { Router } from 'express'
import { AuthenticationMiddleware } from '../../../middlewares/AuthenticationMiddleware'
import { createTodoRoutes } from './createTodo.routes'
import { getTodosRoutes } from './getTodos.routes'
import { updateTodoRoutes } from './updateTodo.routes'
import { deleteTodoRoutes } from './deleteTodo.routes'
import { importantsTodosRoutes } from './importantsTodos.routes'
import { getTodoByIdRoutes } from './getTodoById.routes'
import { completedTodosRoutes } from './completedTodos.routes'

const todoRoutes = Router()
const authenticateToken = AuthenticationMiddleware.authenticateToken

todoRoutes.use( authenticateToken )

todoRoutes.use( '/create' , createTodoRoutes )

todoRoutes.use( '/get' , getTodosRoutes )

todoRoutes.use( '/update' , updateTodoRoutes )

todoRoutes.use( '/delete' , deleteTodoRoutes )

todoRoutes.use( '/todo-id' , getTodoByIdRoutes )

todoRoutes.use( '/important' , importantsTodosRoutes )

todoRoutes.use( '/completed' , completedTodosRoutes )

export default todoRoutes
