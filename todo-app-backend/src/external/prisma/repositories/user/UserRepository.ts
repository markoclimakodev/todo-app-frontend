import { PrismaClient } from '@prisma/client'
import { IUser } from '../../../../core/interfaces/User/IUser'
import { IUserRepository } from '../../../../core/repositories/user/IUserRepository'
import { IRegister } from '../../../../core/interfaces/User/IRegister'
import { ITaskList } from '../../../../core/interfaces/User/ITaskList'

export class UserRepository implements IUserRepository {
	protected prisma: PrismaClient
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
		const { name , email , password } = registerData
		const defaultCategories = [ 'todas tarefas' , 'importantes' , 'concluídas' ]

		await this.prisma.users.create({
			data : {
				name ,
				email ,
				password ,
				taskLists : defaultCategories
			}
		})
	}

	async createUserTaskList ( taskData: ITaskList ): Promise<void> {
		const { name , userId } = taskData

		const getTaskList = await this.prisma.users.findUnique({
			where : {
				id : userId ,
			} ,
			select : {
				taskLists : true ,
			} ,
		})

		if ( !getTaskList ) {
			return
		}

		await this.prisma.users.update({
			where : {
				id : userId ,
			} ,
			data : {
				taskLists : [ ...( getTaskList?.taskLists ?? [] ) , name ] ,
			} ,
		})
	}

	async getUserTaskList ( userId: string ): Promise<string[]> {
		const taskList = await this.prisma.users.findUnique({
			where : {
				id : userId
			} ,
			select : {
				taskLists : true
			}
		})

		return taskList?.taskLists ? taskList.taskLists : []
	}
}

export const userRepository = new UserRepository()
