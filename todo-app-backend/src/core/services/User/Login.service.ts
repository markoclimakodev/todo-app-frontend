import { BadRequestError } from '../../../helpers/ApiError/BadRequestError'
import { PasswordHash } from '../../../utils/passwordHash'
import { handleGenerator } from '../../../utils/handleToken'
import { ILogin , ILoginResponse } from '../../interfaces/User/ILogin'
import { IUserRepository } from '../../repositories/user/IUserRepository'
import { UseCase } from '../../useCases/useCase'

export class Login implements UseCase<ILogin , ILoginResponse | null> {
	constructor ( private readonly userRepository: IUserRepository ) {}
	async execute ( loginData: ILogin ): Promise<ILoginResponse | null> {
		const { email , password } = loginData
		const user = await this.userRepository.findUserByEmail( email )

		if ( !user ) throw new BadRequestError( 'E-mail ou senha inválidos' )

		const checkPassword = await PasswordHash.compare( password , user.password )

		if ( !checkPassword ) throw new BadRequestError( 'E-mail ou senha inválidos' )

		const token = handleGenerator.generate({
			userId : user.id
		})

		return {
			token ,
			userId : user.id
		}
	}
}
