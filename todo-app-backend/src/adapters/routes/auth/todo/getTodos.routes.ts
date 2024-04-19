import { Router , Request , Response } from 'express'
import { GetTodos } from '../../../../core/services/Todo'
import { GetTodosController } from '../../../controllers/Todo'
import { todosRepository } from '../../../database/prisma/repositories/todo/TodoRepository'

const getTodosService = new GetTodos( todosRepository )
const getTodosController = new GetTodosController( getTodosService )
const getTodosRoutes = Router()

getTodosRoutes.get( '/' ,
	( req:Request , res:Response ) => getTodosController.getTodos( req , res ) )

export { getTodosRoutes }

