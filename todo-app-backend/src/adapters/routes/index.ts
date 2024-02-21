import { Router } from 'express'
import { loginRoutes } from './public/login.routes'
import todoRoutes from './auth'
import { registerRoutes } from './public/register.routes'

const router = Router()

router.use( '/login' , loginRoutes )

router.use( '/register' , registerRoutes )

router.use( '/home' , todoRoutes )

export default router
