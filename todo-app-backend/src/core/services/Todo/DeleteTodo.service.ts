import { IDeleteTodo } from '../../interfaces/Todo/IDeleteTodo'
import { ITodoRepository } from '../../repositories/todo/ITodoRepository'
import { UseCase } from '../../useCases/useCase'

export class DeleteTodo implements UseCase<IDeleteTodo , void> {
	constructor ( private readonly todoRepository: ITodoRepository ) { }

	async execute ( params: IDeleteTodo ): Promise<void> {
		const { id } = params

		await this.todoRepository.deleteTodo({
			id
		})
	}
}
