import { Request , Response } from 'express'
import { GetCategories } from '../../../core/services/Category'

export class GetCategoriesController {
	constructor ( private useCase: GetCategories ) {}

	async getCategories ( _req: Request , res: Response ) {
		const categories = await this.useCase.execute()

		res.status( 201 ).json( categories )
	}
}
