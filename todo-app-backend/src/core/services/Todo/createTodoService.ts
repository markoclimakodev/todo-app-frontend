import { ITodo } from '../../interfaces/Todo/ITodo'
import { ITodoRepository } from '../../repositories/ITodoRepository'
import { UseCase } from '../../useCases/useCase'

export class CreateTodoService implements UseCase<ITodo , void> {
	constructor ( private readonly todoRepository: ITodoRepository ) {}

	async execute ( todoData: ITodo ): Promise<void> {
		await this.todoRepository.createTodo( todoData )
	}
}
