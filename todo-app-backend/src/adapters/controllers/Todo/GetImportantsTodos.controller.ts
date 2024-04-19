import { Request , Response } from 'express'
import { GetImportantsTodos } from '../../../core/services/Todo'

export class GetImportantsTodosController {
	constructor ( private useCase: GetImportantsTodos ) {}

	public async getImportantsTodos ( req: Request , res: Response ) {
		const { id } = req.body

		const { important } = req.query

		const todos = await this.useCase.execute({
			id ,
			important : important === 'true' ? true : false
		})

		res.status( 200 ).json( todos )
	}
}
