import { Router , Request , Response } from 'express'

import { userRepository } from '../../../external/prisma/repositories/user/UserRepository'
import { AuthenticationMiddleware } from '../../middlewares/AuthenticationMiddleware'
import { GetTaskListService } from '../../../core/services/User/getTaskListService'
import { GetTaskListController } from '../../controllers/User/getTaskListController'

const getTaskListService = new GetTaskListService( userRepository )
const getTaskListController = new GetTaskListController( getTaskListService )
const getTaskListRoutes = Router()
const authenticateToken = AuthenticationMiddleware.authenticateToken

getTaskListRoutes.use( authenticateToken )

getTaskListRoutes.get( '/' ,
	( req:Request , res:Response ) => getTaskListController.getTaskList( req , res ) )

export { getTaskListRoutes }
