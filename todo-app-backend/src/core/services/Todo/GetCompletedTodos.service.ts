import { IGetCompletedTodos } from '../../interfaces/Todo/IGetCompletedTodos'
import { ITodo } from '../../interfaces/Todo/ITodo'
import { ITodoRepository } from '../../repositories/todo/ITodoRepository'
import { UseCase } from '../../useCases/useCase'

export class GetCompletedTodos implements UseCase<IGetCompletedTodos , ITodo[]> {
	constructor ( private readonly todoRepository: ITodoRepository ) {}

	async execute ( params: IGetCompletedTodos ): Promise<ITodo[]> {
		const { userId } = params

		return await this.todoRepository.getCompletedTodos({
			userId

		})
	}
}
