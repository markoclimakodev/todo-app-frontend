import { Request , Response } from 'express'
import { GetTaskListService } from '../../../core/services/User/getTaskListService'

export class GetTaskListController {
	constructor ( private useCase: GetTaskListService ) {}

	public async getTaskList ( req: Request , res: Response ) {
		const { userId } = req.body

		const taskList = await this.useCase.execute( userId )

		res.status( 201 ).json( taskList )
	}
}
