import { Router } from 'express'
import { AuthenticationMiddleware } from '../../../middlewares/AuthenticationMiddleware'
import { createTaskListRoutes } from './createTaskList.routes'
import { getTaskListRoutes } from './getTaskList.routes'

const taskListRoutes = Router()
const authenticateToken = AuthenticationMiddleware.authenticateToken

taskListRoutes.use( authenticateToken )

taskListRoutes.use( '/' , createTaskListRoutes )

taskListRoutes.use( '/' , getTaskListRoutes )

export default taskListRoutes
