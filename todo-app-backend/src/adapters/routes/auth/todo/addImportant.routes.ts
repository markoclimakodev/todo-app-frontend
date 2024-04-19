import { Router , Request , Response } from 'express'
import { AddImportant } from '../../../../core/services/Todo'
import { AddImportantController } from '../../../controllers/Todo'
import { todosRepository } from '../../../database/prisma/repositories/todo/TodoRepository'

const addImportantService = new AddImportant( todosRepository )
const addImportantController = new AddImportantController( addImportantService )
const addImportantRoutes = Router()

addImportantRoutes.patch( '/' ,
	( req:Request , res:Response ) => addImportantController.addImportant( req , res ) )

export { addImportantRoutes }
