import { ITaskList } from '../../interfaces/User/ITaskList'
import { IUserRepository } from '../../repositories/user/IUserRepository'
import { UseCase } from '../../useCases/useCase'

export class CreateTaskListService implements UseCase<ITaskList , void> {
	constructor ( private readonly userRepository: IUserRepository ) {}

	async execute ( taskListData: ITaskList ): Promise<void> {
		const { name , userId } = taskListData

		await this.userRepository.createUserTaskList({
			name ,
			userId
		})
	}
}
