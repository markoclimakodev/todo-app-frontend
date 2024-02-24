import { Router , Request , Response } from 'express'
import { CreateTodoService } from '../../../core/services/Todo/createTodoService'
import { todoRepository } from '../../../external/prisma/repositories/todo/TodoRepository'
import { CreateTodoController } from '../../controllers/Todo/createTodoController'

const createTodoService = new CreateTodoService( todoRepository )
const createTodoController = new CreateTodoController( createTodoService )
const createTodoRoutes = Router()

createTodoRoutes.post( '/:id' ,
	( req:Request , res:Response ) => createTodoController.createTodo( req , res ) )

export { createTodoRoutes }
