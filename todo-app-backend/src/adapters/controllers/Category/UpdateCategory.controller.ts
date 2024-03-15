import { Request , Response } from 'express'
import { UpdateCategory } from '../../../core/services/Category'

export class UpdateCategoryController {
	constructor ( private useCase: UpdateCategory ) {}

	async updateCategory ( req: Request , res: Response ) {
		const { name , id } = req.body

		await this.useCase.execute({
			name ,
			id ,
		})

		res.status( 204 ).end()
	}
}
