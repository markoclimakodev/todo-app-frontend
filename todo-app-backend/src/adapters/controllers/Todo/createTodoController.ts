import { CreateTodoService } from '../../../core/services/Todo/createTodoService'
import { Request , Response } from 'express'

export class CreateTodoController {
	constructor ( private useCase: CreateTodoService ) {}

	public async createTodo ( req: Request , res: Response ) {
		const user = req.params
		const todoData = req.body

		await this.useCase.execute({
			...todoData ,
			userId : user.id
		})

		res.status( 201 ).end()
	}
}
