import { Request , Response } from 'express'
import { AddCompleted } from '../../../core/services/Todo'

export class AddCompletedController {
	constructor ( private useCase: AddCompleted ) {}

	public async addCompleted ( req: Request , res: Response ) {
		const { id , completed } = req.body

		await this.useCase.execute({
			id ,
			completed
		})

		res.status( 204 ).end()
	}
}
