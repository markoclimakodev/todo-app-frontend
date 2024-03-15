/* eslint-disable max-lines-per-function */
import { PrismaClient } from '@prisma/client'
import { IUser } from '../../../../core/interfaces/User/IUser'
import { IUserRepository } from '../../../../core/repositories/user/IUserRepository'
import { IRegister } from '../../../../core/interfaces/User/IRegister'

export class UserRepository implements IUserRepository {
	protected prisma: PrismaClient
	constructor () {
		this.prisma = new PrismaClient()
	}

	async findUserByEmail ( email: string ): Promise<IUser | null> {
		const foundUser = await this.prisma.user.findUnique({
			where : {
				email
			}
		})

		return foundUser ? foundUser : null
	}

	async registerUser ( registerData: IRegister ): Promise<void> {
		const { name , email , password } = registerData
		const defaultUserCategories = [ 'todas' , 'importantes' ]

		const user = await this.prisma.user.create({
			data : {
				name ,
				email ,
				password
			}
		})

		defaultUserCategories.forEach( async ( category ) => {
			await this.prisma.userCategory.create({
				data : {
					category : {
						connectOrCreate : {
							where : {
								name : category
							} ,
							create : {
								name : category
							} ,
						} ,
					} ,
					user : {
						connect : {
							id : user.id ,
						} ,
					} ,
				} ,
			})
		}
		)
	}
}

export const userRepository = new UserRepository()
