import { IGetTodo } from '../../interfaces/Todo/IGetTodo'
import { ITodo } from '../../interfaces/Todo/ITodo'
import { ITodoRepository } from '../../repositories/todo/ITodoRepository'
import { UseCase } from '../../useCases/useCase'

export class GetTodoService implements UseCase<IGetTodo , ITodo[]> {
	constructor ( private readonly todoRepository: ITodoRepository ) {}

	async execute ( params: IGetTodo ): Promise<ITodo[]> {
		const { id , category } = params

		return await this.todoRepository.getTodos({
			id ,
			category
		})
	}
}
