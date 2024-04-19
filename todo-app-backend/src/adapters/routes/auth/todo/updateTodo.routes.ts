import { Router , Request , Response } from 'express'
import { UpdateTodo } from '../../../../core/services/Todo'
import { UpdateTodoController } from '../../../controllers/Todo'
import { todosRepository } from '../../../database/prisma/repositories/todo/TodoRepository'

const updateTodoService = new UpdateTodo( todosRepository )
const updateTodoController = new UpdateTodoController( updateTodoService )
const updateTodoRoutes = Router()

updateTodoRoutes.patch( '/' ,
	( req:Request , res:Response ) => updateTodoController.updateTodo( req , res ) )

export { updateTodoRoutes }
