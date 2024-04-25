import { Request , Response } from 'express'
import { GetCompletedTodos } from '../../../core/services/Todo'

export class GetCompletedTodosController {
	constructor ( private useCase: GetCompletedTodos ) {}

	public async getCompletedTodos ( req: Request , res: Response ) {
		const { userId } = req.body

		const todos = await this.useCase.execute({
			userId
		})

		res.status( 200 ).json( todos )
	}
}
