import { UpdateTodoService } from '../../../core/services/Todo/updateTodoService'
import { Request , Response } from 'express'

export class UpdateTodoController {
	constructor ( private useCase: UpdateTodoService ) {}

	public async updateTodo ( req: Request , res: Response ) {
		const { id } = req.params
		const infoToUpdate = req.body

		await this.useCase.execute({
			infoToUpdate ,
			id
		})

		res.status( 204 ).end()
	}
}
