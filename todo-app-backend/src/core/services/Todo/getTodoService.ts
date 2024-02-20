import { IGetTodo } from '../../interfaces/Todo/IGetTodo'
import { ITodo } from '../../interfaces/Todo/ITodo'
import { ITodoRepository } from '../../repositories/ITodoRepository'
import { UseCase } from '../../useCases/useCase'

export class GetTodoService implements UseCase<IGetTodo , ITodo[]> {
	constructor ( private readonly todoRepository: ITodoRepository ) {}

	async execute ( getTodoParams:IGetTodo ): Promise<ITodo[]> {
		return await this.todoRepository.getTodos( getTodoParams )
	}
}
