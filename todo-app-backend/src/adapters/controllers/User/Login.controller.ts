import { Login } from '../../../core/services/User'
import { Request , Response } from 'express'

export class LoginController {
	constructor ( private useCase: Login ) {}

	public async login ( req:Request , res:Response ) {
		const loginData = req.body
		const authResponse = await this.useCase.execute( loginData )

		res.status( 200 ).json({
			authResponse
		})
	}
}
