import { GetTodoService } from '../../../core/services/Todo/getTodoService'
import { Request , Response } from 'express'

export class GetTodoController {
	constructor ( private useCase: GetTodoService ) { }

	public async getTodos ( req: Request , res: Response ) {
		const { id } = req.params
		const todos = await this.useCase.execute( id )

		res.status( 200 ).json( todos )
	}
}
