import { Request , Response } from 'express'
import { UpdateTodo } from '../../../core/services/Todo'

export class UpdateTodoController {
	constructor ( private useCase: UpdateTodo ) {}

	public async updateTodo ( req: Request , res: Response ) {
		const {
			id ,
			title ,
			description ,
			category
		} = req.body

		await this.useCase.execute({
			id ,
			title ,
			description ,
			category
		})

		res.status( 204 ).end()
	}
}
