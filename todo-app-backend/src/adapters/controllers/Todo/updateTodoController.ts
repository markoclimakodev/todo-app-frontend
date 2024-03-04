import { UpdateTodoService } from '../../../core/services/Todo/updateTodoService'
import { Request , Response } from 'express'

export class UpdateTodoController {
	constructor ( private useCase: UpdateTodoService ) {}

	public async updateTodo ( req: Request , res: Response ) {
		const { title , description , taskType , id , updateType } = req.body

		await this.useCase.execute({
			updateType ,
			id ,
			title ,
			description ,
			taskType ,
		})

		res.status( 204 ).end()
	}
}
