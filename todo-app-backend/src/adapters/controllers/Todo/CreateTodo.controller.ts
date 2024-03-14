import { Request , Response } from 'express'
import { CreateTodo } from '../../../core/services/Todo'

export class CreateTodoController {
	constructor ( private useCase: CreateTodo ) {}

	public async createTodo ( req: Request , res: Response ) {
		const { title , description , category , userId } = req.body

		await this.useCase.execute({
			userId ,
			title ,
			description ,
			category
		})

		res.status( 201 ).end()
	}
}
