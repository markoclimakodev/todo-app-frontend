import { PrismaClient } from '@prisma/client'
import { IUser } from '../../../../core/interfaces/User/IUser'
import { IUserRepository } from '../../../../core/repositories/user/IUserRepository'
import { IRegister } from '../../../../core/interfaces/User/IRegister'

export class UserRepository implements IUserRepository {
	protected prisma : PrismaClient
	constructor () {
		this.prisma = new PrismaClient()
	}

	async findUserByEmail ( email: string ): Promise<IUser | null> {
		const foundUser = await this.prisma.users.findUnique({
			where : {
				email
			}
		})

		return foundUser ? foundUser : null
	}

	async registerUser ( registerData: IRegister ): Promise<void> {
		await this.prisma.users.create({
			data : registerData
		})
	}
}

export const userRepository = new UserRepository()
