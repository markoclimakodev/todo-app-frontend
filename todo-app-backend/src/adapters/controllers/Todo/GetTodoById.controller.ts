import { Request , Response } from 'express'
import { GetTodoById } from '../../../core/services/Todo'

export class GetTodoByIdController {
	constructor ( private useCase: GetTodoById ) {}

	public async getTodoById ( req: Request , res: Response ) {
		const { todoId } = req.params

		const todo = await this.useCase.execute({
			todoId
		})

		res.status( 200 ).json( todo )
	}
}
