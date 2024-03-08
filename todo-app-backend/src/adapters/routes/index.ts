import { Router } from 'express'
import todoRoutes from './auth/todo'
import userRoutes from './public'
import categoriesRoutes from './auth/category'

const router = Router()

router.use( '/user' , userRoutes )

router.use( '/todo' , todoRoutes )

router.use( '/category' , categoriesRoutes )

export default router
