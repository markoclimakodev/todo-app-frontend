import { Router , Request , Response } from 'express'
import { LoginService } from '../../../core/services/User/LoginService'
import { LoginController } from '../../controllers/User/loginController'
import { userRepository } from '../../../external/prisma/repositories/user/UserRepository'

const loginRoutes = Router()

const loginService = new LoginService( userRepository )
const loginController = new LoginController( loginService )

loginRoutes.post( '/' , async ( req:Request , res:Response ) => loginController.login( req , res ) )

export { loginRoutes }
