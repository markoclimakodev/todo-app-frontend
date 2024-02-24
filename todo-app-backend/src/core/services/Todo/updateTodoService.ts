import { IUpdateTodo } from '../../interfaces/Todo/IUpdateTodo'
import { ITodoRepository } from '../../repositories/todo/ITodoRepository'
import { UseCase } from '../../useCases/useCase'

export class UpdateTodoService implements UseCase<IUpdateTodo , void> {
	constructor ( private readonly todoRepository: ITodoRepository ) {}

	async execute ( updateInfo: IUpdateTodo ): Promise<void> {
		await this.todoRepository.updateTodo( updateInfo )
	}
}
