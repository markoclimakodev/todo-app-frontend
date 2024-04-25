import { Request , Response } from 'express'
import { UpdateCategory } from '../../../core/services/Category'

export class UpdateCategoryController {
	constructor ( private useCase: UpdateCategory ) {}

	async updateCategory ( req: Request , res: Response ) {
		const { name , userCategoryId } = req.body

		await this.useCase.execute({
			name ,
			userCategoryId ,
		})

		res.status( 204 ).end()
	}
}
