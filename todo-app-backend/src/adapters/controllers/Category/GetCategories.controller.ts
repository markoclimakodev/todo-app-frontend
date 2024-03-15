import { Request , Response } from 'express'
import { GetCategories } from '../../../core/services/Category'

export class GetCategoriesController {
	constructor ( private useCase: GetCategories ) {}

	async getCategories ( req: Request , res: Response ) {
		const { userId } = req.body
		const categories = await this.useCase.execute( userId )

		res.status( 201 ).json( categories )
	}
}
