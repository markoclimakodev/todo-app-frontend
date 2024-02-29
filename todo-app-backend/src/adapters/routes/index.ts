import { Router } from 'express'
import { loginRoutes } from './public/login.routes'
import todoRoutes from './auth/todo'
import { registerRoutes } from './public/register.routes'
import taskListRoutes from './auth/user'

const router = Router()

router.use( '/login' , loginRoutes )

router.use( '/register' , registerRoutes )

router.use( '/todo' , todoRoutes )

router.use( '/tasklist' , taskListRoutes )

export default router
