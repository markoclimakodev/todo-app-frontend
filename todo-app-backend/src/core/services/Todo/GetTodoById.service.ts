import { IGetTodoById } from '../../interfaces/Todo/IGetTodoById'
import { ITodo } from '../../interfaces/Todo/ITodo'
import { ITodoRepository } from '../../repositories/todo/ITodoRepository'
import { UseCase } from '../../useCases/useCase'

export class GetTodoById implements UseCase<IGetTodoById , ITodo> {
	constructor ( private readonly todoRepository: ITodoRepository ) {}

	async execute ( params: IGetTodoById ): Promise<ITodo> {
		const { todoId } = params

		return await this.todoRepository.getTodoById({
			todoId
		})
	}
}
