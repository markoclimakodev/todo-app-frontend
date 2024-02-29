import { Router , Request , Response } from 'express'

import { CreateTaskListService } from '../../../../core/services/User/CreateTaskListService'
import { userRepository } from '../../../../external/prisma/repositories/user/UserRepository'
import { CreateTaskListController } from '../../../controllers/User/createTaskListController'

const createTaskListService = new CreateTaskListService( userRepository )
const createTaskListController = new CreateTaskListController( createTaskListService )
const createTaskListRoutes = Router()

createTaskListRoutes.patch( '/' ,
	( req:Request , res:Response ) => createTaskListController.createTaskList( req , res ) )

export { createTaskListRoutes }
