import { Router , Request , Response } from 'express'

import { CreateTaskListService } from '../../../core/services/User/CreateTaskListService'
import { userRepository } from '../../../external/prisma/repositories/user/UserRepository'
import { CreateTaskListController } from '../../controllers/User/createTaskListController'
import { AuthenticationMiddleware } from '../../middlewares/AuthenticationMiddleware'

const createTodoService = new CreateTaskListService( userRepository )
const createTaskListController = new CreateTaskListController( createTodoService )
const taskListRoutes = Router()
const authenticateToken = AuthenticationMiddleware.authenticateToken

taskListRoutes.use( authenticateToken )

taskListRoutes.patch( '/' ,
	( req:Request , res:Response ) => createTaskListController.createTaskList( req , res ) )

export { taskListRoutes }
