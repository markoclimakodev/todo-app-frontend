import { GetTodoService } from '../../../core/services/Todo/getTodoService'
import { Request , Response } from 'express'

export class GetTodoController {
	constructor ( private useCase: GetTodoService ) { }

	public async getTodos ( req: Request , res: Response ) {
		const { id } = req.params
		const { category } = req.query

		const todos = await this.useCase.execute({
			id ,
			category : String( category )
		})

		res.status( 200 ).json( todos )
	}
}
