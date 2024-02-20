import { Router } from 'express'
import { loginRoutes } from './public/login.routes'
import todoRoutes from './auth'

const router = Router()

router.use( '/login' , loginRoutes )

router.use( '/home' , todoRoutes )

export default router
