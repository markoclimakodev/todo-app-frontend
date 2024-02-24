import { IInfoToUpdate } from '../../interfaces/Todo/IInfoToUpdate'
import { ITodoRepository } from '../../repositories/todo/ITodoRepository'
import { UseCase } from '../../useCases/useCase'

export class UpdateTodoService implements UseCase<IInfoToUpdate , void> {
	constructor ( private readonly todoRepository: ITodoRepository ) {}

	async execute ( todoData: IInfoToUpdate ): Promise<void> {
		await this.todoRepository.updateTodo( todoData )
	}
}
