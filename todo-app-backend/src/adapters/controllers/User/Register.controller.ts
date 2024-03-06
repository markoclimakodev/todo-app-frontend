import { Request , Response } from 'express'
import { Register } from '../../../core/services/User'

export class RegisterController {
	constructor ( private useCase: Register ) {}

	public async register ( req: Request , res: Response ) {
		const registerData = req.body

		await this.useCase.execute( registerData )

		res.status( 201 ).end()
	}
}
