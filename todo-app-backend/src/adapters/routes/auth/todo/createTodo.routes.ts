import { Router , Request , Response } from 'express'
import { CreateTodo } from '../../../../core/services/Todo'
import { todosRepository } from '../../../../external/prisma/repositories/todo/TodoRepository'
import { CreateTodoController } from '../../../controllers/Todo'

const createTodoService = new CreateTodo( todosRepository )
const createTodoController = new CreateTodoController( createTodoService )
const createTodoRoutes = Router()

createTodoRoutes.post( '/' ,
	( req:Request , res:Response ) => createTodoController.createTodo( req , res ) )

export { createTodoRoutes }
