import { IAddCompleted } from '../../interfaces/Todo/IAddCompleted'
import { ITodoRepository } from '../../repositories/todo/ITodoRepository'
import { UseCase } from '../../useCases/useCase'

export class AddCompleted implements UseCase<IAddCompleted , void> {
	constructor ( private readonly todoRepository: ITodoRepository ) {}

	async execute ( params: IAddCompleted ): Promise<void> {
		const { id , completed } = params

		await this.todoRepository.addCompleted({
			id ,
			completed
		})
	}
}
