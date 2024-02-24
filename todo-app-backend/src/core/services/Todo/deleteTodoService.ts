import { ITodoRepository } from '../../repositories/todo/ITodoRepository'
import { UseCase } from '../../useCases/useCase'

export class DeleteTodoService implements UseCase<string , void> {
	constructor ( private readonly todoRepository: ITodoRepository ) {}

	async execute ( id:string ): Promise<void> {
		await this.todoRepository.deleteTodo( id )
	}
}
