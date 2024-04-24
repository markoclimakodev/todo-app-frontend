import { Request , Response } from 'express'
import { GetCompletedTodos } from '../../../core/services/Todo'

export class GetCompletedTodosController {
	constructor ( private useCase: GetCompletedTodos ) {}

	public async getCompletedTodos ( req: Request , res: Response ) {
		const { id } = req.body

		const { completed } = req.query

		const todos = await this.useCase.execute({
			id ,
			completed : completed === 'true' ? true : false
		})

		res.status( 200 ).json( todos )
	}
}
