import { Request , Response } from 'express'
import { CreateTodo } from '../../../core/services/Todo'

export class CreateTodoController {
	constructor ( private useCase: CreateTodo ) {}

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
