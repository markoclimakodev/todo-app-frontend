import { ICreateTodo } from '../../interfaces/Todo/ICreateTodo'
import { ITodoRepository } from '../../repositories/todo/ITodoRepository'
import { UseCase } from '../../useCases/useCase'

export class CreateTodo implements UseCase<ICreateTodo , void> {
	constructor ( private readonly todoRepository: ITodoRepository ) {}

	async execute ( params: ICreateTodo ): Promise<void> {
		const { userId , title , description , categoryName } = params

		await this.todoRepository.createTodo({
			userId ,
			title ,
			description ,
			categoryName
		})
	}
}
