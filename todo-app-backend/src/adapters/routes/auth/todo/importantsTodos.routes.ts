import { Router , Request , Response } from 'express'
import { AddImportant , GetImportantsTodos } from '../../../../core/services/Todo'
import { AddImportantController , GetImportantsTodosController } from '../../../controllers/Todo'
import { todosRepository } from '../../../database/prisma/repositories/todo/TodoRepository'

const getImportantsTodosService = new GetImportantsTodos( todosRepository )
const getImportantsTodosController = new GetImportantsTodosController( getImportantsTodosService )
const addImportantService = new AddImportant( todosRepository )
const addImportantController = new AddImportantController( addImportantService )
const importantsTodosRoutes = Router()

importantsTodosRoutes.get( '/' ,
	( req:Request , res:Response ) => getImportantsTodosController.getImportantsTodos( req , res ) )

importantsTodosRoutes.patch( '/' ,
	( req:Request , res:Response ) => addImportantController.addImportant( req , res ) )

export { importantsTodosRoutes }

