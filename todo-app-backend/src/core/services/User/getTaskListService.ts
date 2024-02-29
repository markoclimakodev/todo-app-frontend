import { IUserRepository } from '../../repositories/user/IUserRepository'
import { UseCase } from '../../useCases/useCase'

export class GetTaskListService implements UseCase<string , string[]> {
	constructor ( private readonly userRepository: IUserRepository ) {}

	async execute ( userId:string ): Promise<string[]> {
		return await this.userRepository.getUserTaskList( userId )
	}
}
