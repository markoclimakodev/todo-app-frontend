import { Router , Request , Response } from 'express'
import { userRepository } from '../../../external/prisma/repositories/UserRepository'
import { RegisterService } from '../../../core/services/User/RegisterService'
import { RegisterController } from '../../controllers/User/registerController'

const registerRoutes = Router()

const registerService = new RegisterService( userRepository )
const registerController = new RegisterController( registerService )

registerRoutes.post( '/' , async ( req:Request , res:Response ) => registerController.register( req , res ) )

export { registerRoutes }
