import { Router } from 'express'
import todoRoutes from './auth/todo'
import userRoutes from './public'

const router = Router()

router.use( '/user' , userRoutes )

router.use( '/todo' , todoRoutes )

export default router
