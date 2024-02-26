import { Router , Request , Response } from 'express'
import { todoRepository } from '../../../external/prisma/repositories/todo/TodoRepository'
import { UpdateTodoService } from '../../../core/services/Todo/updateTodoService'
import { UpdateTodoController } from '../../controllers/Todo/updateTodoController'

const updateTodoService = new UpdateTodoService( todoRepository )
const updateTodoController = new UpdateTodoController( updateTodoService )
const updateTodoRoutes = Router()

updateTodoRoutes.patch( '/' ,
	( req:Request , res:Response ) => updateTodoController.updateTodo( req , res ) )

export { updateTodoRoutes }
