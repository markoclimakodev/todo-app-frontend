import { Router } from 'express'
import { loginRoutes } from './login.routes'
import { registerRoutes } from './register.routes'

const userRoutes = Router()

userRoutes.use( '/login' , loginRoutes )

userRoutes.use( '/register' , registerRoutes )

export default userRoutes
