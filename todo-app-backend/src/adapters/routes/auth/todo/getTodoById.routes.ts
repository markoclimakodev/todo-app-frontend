import { Router , Request , Response } from 'express'
import { GetTodoById } from '../../../../core/services/Todo'
import { GetTodoByIdController } from '../../../controllers/Todo'
import { todosRepository } from '../../../database/prisma/repositories/todo/TodoRepository'

const getTodoByIdService = new GetTodoById( todosRepository )
const getTodoByIdController = new GetTodoByIdController( getTodoByIdService )
const getTodoByIdRoutes = Router()

getTodoByIdRoutes.get( '/:todoId' ,
	( req:Request , res:Response ) => getTodoByIdController.getTodoById( req , res ) )

export { getTodoByIdRoutes }

