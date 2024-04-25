import { IGetTodoStatus } from '../../interfaces/Todo/IGetTodoStatus'
import { ITodo } from '../../interfaces/Todo/ITodo'
import { ITodoRepository } from '../../repositories/todo/ITodoRepository'
import { UseCase } from '../../useCases/useCase'

export class GetCompletedTodos implements UseCase<IGetTodoStatus , ITodo[]> {
	constructor ( private readonly todoRepository: ITodoRepository ) {}

	async execute ( params: IGetTodoStatus ): Promise<ITodo[]> {
		const { userId } = params

		return await this.todoRepository.getCompletedTodos({
			userId

		})
	}
}
