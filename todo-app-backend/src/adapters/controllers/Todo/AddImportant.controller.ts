import { Request , Response } from 'express'
import { AddImportant } from '../../../core/services/Todo'

export class AddImportantController {
	constructor ( private useCase: AddImportant ) {}

	public async addImportant ( req: Request , res: Response ) {
		const { id , important } = req.body

		await this.useCase.execute({
			id ,
			important
		})

		res.status( 204 ).end()
	}
}
