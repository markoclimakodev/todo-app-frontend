import { IAddImportant } from '../../interfaces/Todo/IAddImportant'
import { ITodoRepository } from '../../repositories/todo/ITodoRepository'
import { UseCase } from '../../useCases/useCase'

export class AddImportant implements UseCase<IAddImportant , void> {
	constructor ( private readonly todoRepository: ITodoRepository ) {}

	async execute ( params: IAddImportant ): Promise<void> {
		const { id , important } = params

		await this.todoRepository.addImportant({
			id ,
			important
		})
	}
}
