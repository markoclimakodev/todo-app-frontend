import { DeleteTodoService } from '../../../core/services/Todo/deleteTodoService'
import { Request , Response } from 'express'

export class DeleteTodoController {
	constructor ( private useCase: DeleteTodoService ) {}

	public async deleteTodo ( req: Request , res: Response ) {
		const { id } = req.params

		await this.useCase.execute( id )

		res.status( 204 ).end()
	}
}
