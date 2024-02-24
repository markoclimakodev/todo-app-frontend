import { ITodo } from '../../interfaces/Todo/ITodo'
import { ITodoRepository } from '../../repositories/todo/ITodoRepository'
import { UseCase } from '../../useCases/useCase'

export class GetTodoService implements UseCase<string , ITodo[]> {
	constructor ( private readonly todoRepository: ITodoRepository ) {}

	async execute ( id:string ): Promise<ITodo[]> {
		return await this.todoRepository.getTodos( id )
	}
}
