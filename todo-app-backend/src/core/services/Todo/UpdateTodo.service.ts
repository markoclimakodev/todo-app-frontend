import { IUpdateTodo } from '../../interfaces/Todo/IUpdateTodo'
import { ITodoRepository } from '../../repositories/todo/ITodoRepository'
import { UseCase } from '../../useCases/useCase'

export class UpdateTodo implements UseCase<IUpdateTodo , void> {
	constructor ( private readonly todoRepository: ITodoRepository ) {}

	async execute ( params: IUpdateTodo ): Promise<void> {
		const { id , title , description , category } = params

		await this.todoRepository.updateTodo({
			id ,
			title ,
			description ,
			category
		})
	}
}
