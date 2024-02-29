import { CreateTaskListService } from '../../../core/services/User/CreateTaskListService'
import { Request , Response } from 'express'

export class CreateTaskListController {
	constructor ( private useCase: CreateTaskListService ) {}

	public async createTaskList ( req: Request , res: Response ) {
		const { name , userId } = req.body

		await this.useCase.execute({
			name ,
			userId
		})

		res.status( 201 ).end()
	}
}
