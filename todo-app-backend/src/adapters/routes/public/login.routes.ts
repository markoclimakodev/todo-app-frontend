import { Router , Request , Response } from 'express'
import { Login } from '../../../core/services/User'
import { userRepository } from '../../../external/prisma/repositories/user/UserRepository'
import { LoginController } from '../../controllers/User'

const loginRoutes = Router()

const loginService = new Login( userRepository )
const loginController = new LoginController( loginService )

loginRoutes.post( '/' , async ( req:Request , res:Response ) => loginController.login( req , res ) )

export { loginRoutes }
