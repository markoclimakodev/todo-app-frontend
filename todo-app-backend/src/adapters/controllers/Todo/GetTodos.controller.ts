import { Request , Response } from 'express'
import { GetTodos } from '../../../core/services/Todo'

export class GetTodosController {
	constructor ( private useCase: GetTodos ) {}

	public async getTodos ( req: Request , res: Response ) {
		const { userId } = req.body
		const { categoryName } = req.query
		const todos = await this.useCase.execute({
			userId ,
			categoryName : String( categoryName )
		})

		res.status( 200 ).json( todos )
	}
}
