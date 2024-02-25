import { GetTodoService } from '../../../core/services/Todo/getTodoService'
import { Request , Response } from 'express'

export class GetTodoController {
	constructor ( private useCase: GetTodoService ) { }

	public async getTodos ( req: Request , res: Response ) {
		const { userId } = req.body
		const { taskType } = req.query

		const todos = await this.useCase.execute({
			userId ,
			taskType : String( taskType )
		})

		res.status( 200 ).json( todos )
	}
}
