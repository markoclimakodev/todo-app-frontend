import { GetTodoService } from '../../../core/services/Todo/getTodoService'
import { Request , Response } from 'express'

export class GetTodoController {
	constructor ( private useCase: GetTodoService ) {}

	public async getTodos ( req: Request , res: Response ) {
		const { id } = req.params
		const { completed } = req.query
		const isCompleted = completed === 'true'
		const todos = await this.useCase.execute({
			id ,
			completed : isCompleted
		})

		res.status( 200 ).json( todos )
	}
}
