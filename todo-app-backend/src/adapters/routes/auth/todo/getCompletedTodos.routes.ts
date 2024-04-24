import { Router , Request , Response } from 'express'
import { GetCompletedTodos } from '../../../../core/services/Todo'
import { GetCompletedTodosController } from '../../../controllers/Todo'
import { todosRepository } from '../../../database/prisma/repositories/todo/TodoRepository'

const getCompletedTodosService = new GetCompletedTodos( todosRepository )
const getCompletedTodosController = new GetCompletedTodosController( getCompletedTodosService )
const getCompletedTodosRoutes = Router()

getCompletedTodosRoutes.get( '/' ,
	( req:Request , res:Response ) => getCompletedTodosController.getCompletedTodos( req , res ) )

export { getCompletedTodosRoutes }

