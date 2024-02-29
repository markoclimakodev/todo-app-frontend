import { Router } from 'express'
import { loginRoutes } from './public/login.routes'
import todoRoutes from './auth'
import { registerRoutes } from './public/register.routes'
import { taskListRoutes } from './auth/createTaskList.routes'
import { getTaskListRoutes } from './auth/getTaskList.routes'

const router = Router()

router.use( '/login' , loginRoutes )

router.use( '/register' , registerRoutes )

router.use( '/todo' , todoRoutes )

router.use( '/tasklist' , taskListRoutes )

router.use( '/gettasklist' , getTaskListRoutes )

export default router
