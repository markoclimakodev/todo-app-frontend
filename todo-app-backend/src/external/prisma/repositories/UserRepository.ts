import { PrismaClient } from '@prisma/client'
import { IUser } from '../../../core/interfaces/User/IUser'
import { IUserRepository } from '../../../core/repositories/IUserRepository'

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
}

export const userRepository = new UserRepository()
