import { Request , Response } from 'express'
import { GetImportantsTodos } from '../../../core/services/Todo'

export class GetImportantsTodosController {
	constructor ( private useCase: GetImportantsTodos ) {}

	public async getImportantsTodos ( req: Request , res: Response ) {
		const { userId } = req.body

		const todos = await this.useCase.execute({
			userId
		})

		res.status( 200 ).json( todos )
	}
}
