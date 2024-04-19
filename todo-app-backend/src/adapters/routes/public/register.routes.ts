import { Router , Request , Response } from 'express'
import { Register } from '../../../core/services/User'
import { RegisterController } from '../../controllers/User'
import { userRepository } from '../../database/prisma/repositories/user/UserRepository'

const registerRoutes = Router()

const registerService = new Register( userRepository )
const registerController = new RegisterController( registerService )

registerRoutes.post( '/' , async ( req:Request , res:Response ) => registerController.register( req , res ) )

export { registerRoutes }
