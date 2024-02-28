import { GetTodoService } from '../../../core/services/Todo/getTodoService'
import { Request , Response } from 'express'

export class GetTodoController {
	constructor ( private useCase: GetTodoService ) { }

	public async getTodos ( req: Request , res: Response ) {
		const { userId } = req.body
		const { tasktype } = req.query

		const todos = await this.useCase.execute({
			userId ,
			tasktype : String( tasktype )
		})

		res.status( 200 ).json( todos )
	}
}
