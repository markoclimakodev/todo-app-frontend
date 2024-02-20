import { Router } from 'express'
import { AuthenticationMiddleware } from '../../middlewares/AuthenticationMiddleware'
import { createTodoRoutes } from './createTodo.routes'
import { getTodosRoutes } from './getTodos.routes'
import { updateTodoRoutes } from './updateTodo.routes'
import { deleteTodoRoutes } from './deleteTodo.routes'

const todoRoutes = Router()
const authenticateToken = AuthenticationMiddleware.authenticateToken

todoRoutes.use( '/' , authenticateToken , createTodoRoutes )

todoRoutes.use( '/' , authenticateToken , getTodosRoutes )

todoRoutes.use( '/:userId/' , authenticateToken , updateTodoRoutes )

todoRoutes.use( '/:userId/' , authenticateToken , deleteTodoRoutes )

export default todoRoutes
