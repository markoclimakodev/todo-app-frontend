import { Router , Request , Response } from 'express'
import { GetTodosService } from '../../../../core/services/Todo/getTodosService'
import { GetTodosController } from '../../../controllers/Todo/getTodosController'
import { todosRepository } from '../../../../external/prisma/repositories/todo/TodoRepository'

const getTodosService = new GetTodosService( todosRepository )
const getTodosController = new GetTodosController( getTodosService )
const getTodosRoutes = Router()

getTodosRoutes.get( '/' ,
	( req:Request , res:Response ) => getTodosController.getTodos( req , res ) )

export { getTodosRoutes }

