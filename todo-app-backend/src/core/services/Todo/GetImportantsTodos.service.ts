import { IGetImportantsTodos } from '../../interfaces/Todo/IGetImportantsTodos'
import { ITodo } from '../../interfaces/Todo/ITodo'
import { ITodoRepository } from '../../repositories/todo/ITodoRepository'
import { UseCase } from '../../useCases/useCase'

export class GetImportantsTodos implements UseCase<IGetImportantsTodos , ITodo[]> {
	constructor ( private readonly todoRepository: ITodoRepository ) {}

	async execute ( params: IGetImportantsTodos ): Promise<ITodo[]> {
		const { id , important } = params

		return await this.todoRepository.getImportantsTodos({
			id ,
			important
		})
	}
}
