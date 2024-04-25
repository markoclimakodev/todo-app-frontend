import { Router , Request , Response } from 'express'
import { AddCompleted , GetCompletedTodos } from '../../../../core/services/Todo'
import { AddCompletedController , GetCompletedTodosController } from '../../../controllers/Todo'
import { todosRepository } from '../../../database/prisma/repositories/todo/TodoRepository'

const getCompletedTodosService = new GetCompletedTodos( todosRepository )
const getCompletedTodosController = new GetCompletedTodosController( getCompletedTodosService )
const addCompletedService = new AddCompleted( todosRepository )
const addCompletedController = new AddCompletedController( addCompletedService )
const completedTodosRoutes = Router()

completedTodosRoutes.get( '/' ,
	( req:Request , res:Response ) => getCompletedTodosController.getCompletedTodos( req , res ) )

completedTodosRoutes.patch( '/' ,
	( req:Request , res:Response ) => addCompletedController.addCompleted( req , res ) )

export { completedTodosRoutes }
