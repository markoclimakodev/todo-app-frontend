import { Request , Response } from 'express'
import { CreateCategory } from '../../../core/services/Category'

export class CreateCategoryController {
	constructor ( private useCase: CreateCategory ) {}

	async createCategory ( req: Request , res: Response ) {
		const { name , userId } = req.body

		await this.useCase.execute({
			name ,
			userId
		})

		res.status( 201 ).end()
	}
}
