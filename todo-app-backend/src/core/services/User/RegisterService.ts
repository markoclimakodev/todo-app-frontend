import { PasswordHash } from '../../../utils/passwordHash'
import { IRegister } from '../../interfaces/User/IRegister'
import { IUserRepository } from '../../repositories/user/IUserRepository'
import { UseCase } from '../../useCases/useCase'

export class RegisterService implements UseCase<IRegister , void> {
	constructor ( private readonly userRepository: IUserRepository ) {}

	async execute ( registerData: IRegister ): Promise<void> {
		const { password } = registerData

		const hashedPassword = PasswordHash.hash( password )

		await this.userRepository.registerUser({
			...registerData ,
			password : hashedPassword
		})
	}
}
