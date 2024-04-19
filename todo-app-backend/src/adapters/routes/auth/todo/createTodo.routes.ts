import { Router , Request , Response } from 'express'
import { CreateTodo } from '../../../../core/services/Todo'
import { CreateTodoController } from '../../../controllers/Todo'
import { todosRepository } from '../../../database/prisma/repositories/todo/TodoRepository'

const createTodoService = new CreateTodo( todosRepository )
const createTodoController = new CreateTodoController( createTodoService )
const createTodoRoutes = Router()

createTodoRoutes.post( '/' ,
	( req:Request , res:Response ) => createTodoController.createTodo( req , res ) )

export { createTodoRoutes }
