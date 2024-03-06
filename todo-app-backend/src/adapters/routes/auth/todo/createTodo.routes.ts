import { Router , Request , Response } from 'express'
import { CreateTodoService } from '../../../../core/services/Todo/createTodoService'
import { CreateTodoController } from '../../../controllers/Todo/createTodoController'
import { todosRepository } from '../../../../external/prisma/repositories/todo/TodoRepository'

const createTodoService = new CreateTodoService( todosRepository )
const createTodoController = new CreateTodoController( createTodoService )
const createTodoRoutes = Router()

createTodoRoutes.post( '/' ,
	( req:Request , res:Response ) => createTodoController.createTodo( req , res ) )

export { createTodoRoutes }
