import { CreateTodoService } from '../../../core/services/Todo/createTodoService'
import { Request , Response } from 'express'

export class CreateTodoController {
	constructor ( private useCase: CreateTodoService ) {}

	public async createTodo ( req: Request , res: Response ) {
		const { title , description , taskType , userId } = req.body

		await this.useCase.execute({
			userId ,
			title ,
			description ,
			taskType
		})

		res.status( 201 ).end()
	}
}
