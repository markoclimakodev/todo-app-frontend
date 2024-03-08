import { Request , Response } from 'express'
import { DeleteTodo } from '../../../core/services/Todo'

export class DeleteTodoController {
	constructor ( private useCase: DeleteTodo ) {}

	public async deleteTodo ( req: Request , res: Response ) {
		const { id 	} = req.body

		await this.useCase.execute({
			id ,
		})

		res.status( 204 ).end()
	}
}
