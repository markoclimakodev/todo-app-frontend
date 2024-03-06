import { Router , Request , Response } from 'express'
import { GetTodos } from '../../../../core/services/Todo'
import { todosRepository } from '../../../../external/prisma/repositories/todo/TodoRepository'
import { GetTodosController } from '../../../controllers/Todo'

const getTodosService = new GetTodos( todosRepository )
const getTodosController = new GetTodosController( getTodosService )
const getTodosRoutes = Router()

getTodosRoutes.get( '/' ,
	( req:Request , res:Response ) => getTodosController.getTodos( req , res ) )

export { getTodosRoutes }

