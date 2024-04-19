import { Router , Request , Response } from 'express'
import { DeleteTodo } from '../../../../core/services/Todo'
import { DeleteTodoController } from '../../../controllers/Todo'
import { todosRepository } from '../../../database/prisma/repositories/todo/TodoRepository'

const deleteTodoService = new DeleteTodo( todosRepository )
const deleteTodoController = new DeleteTodoController( deleteTodoService )
const deleteTodoRoutes = Router()

deleteTodoRoutes.delete( '/' ,
	( req:Request , res:Response ) => deleteTodoController.deleteTodo( req , res ) )

export { deleteTodoRoutes }
