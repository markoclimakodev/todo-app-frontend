import { IGetTodos } from '../../interfaces/Todo/IGetTodos'
import { ITodo } from '../../interfaces/Todo/ITodo'
import { ITodoRepository } from '../../repositories/todo/ITodoRepository'
import { UseCase } from '../../useCases/useCase'

export class GetTodos implements UseCase<IGetTodos , ITodo[]> {
	constructor ( private readonly todoRepository: ITodoRepository ) {}

	async execute ( params: IGetTodos ): Promise<ITodo[]> {
		const { userId , categoryName } = params

		return await this.todoRepository.getTodos({
			userId ,
			categoryName
		})
	}
}
