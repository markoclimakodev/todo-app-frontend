import { RegisterService } from '../../../core/services/User/RegisterService'
import { Request , Response } from 'express'

export class RegisterController {
	constructor ( private useCase: RegisterService ) {}

	public async register ( req: Request , res: Response ) {
		const registerData = req.body

		await this.useCase.execute( registerData )

		res.status( 201 ).end()
	}
}
