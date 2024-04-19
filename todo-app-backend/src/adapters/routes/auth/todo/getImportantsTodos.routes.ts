import { Router , Request , Response } from 'express'
import { GetImportantsTodos } from '../../../../core/services/Todo'
import { GetImportantsTodosController } from '../../../controllers/Todo'
import { todosRepository } from '../../../database/prisma/repositories/todo/TodoRepository'

const getImportantsTodosService = new GetImportantsTodos( todosRepository )
const getImportantsTodosController = new GetImportantsTodosController( getImportantsTodosService )
const getImportantsTodosRoutes = Router()

getImportantsTodosRoutes.get( '/' ,
	( req:Request , res:Response ) => getImportantsTodosController.getImportantsTodos( req , res ) )

export { getImportantsTodosRoutes }

