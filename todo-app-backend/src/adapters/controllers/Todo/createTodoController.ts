import { CreateTodoService } from '../../../core/services/Todo/createTodoService'
import { Request , Response } from 'express'

export class CreateTodoController {
	constructor ( private useCase: CreateTodoService ) {}

	public async createTodo ( req: Request , res: Response ) {
		const { title , description , categoryName , userId } = req.body

		await this.useCase.execute({
			userId ,
			title ,
			description ,
			categoryName
		})

		res.status( 201 ).end()
	}
}
