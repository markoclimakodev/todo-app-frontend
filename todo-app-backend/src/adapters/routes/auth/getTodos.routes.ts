import { Router , Request , Response } from 'express'
import { todoRepository } from '../../../external/prisma/repositories/TodoRepository'
import { GetTodoService } from '../../../core/services/Todo/getTodoService'
import { GetTodoController } from '../../controllers/Todo/getTodoController'

const getTodosService = new GetTodoService( todoRepository )
const getTodosController = new GetTodoController( getTodosService )
const getTodosRoutes = Router()

getTodosRoutes.get( '/:id' ,
	( req:Request , res:Response ) => getTodosController.getTodos( req , res ) )

export { getTodosRoutes }
