import { PrismaClient } from '@prisma/client'
import { ITodoRepository } from '../../../../core/repositories/todo/ITodoRepository'
import { ITodo } from '../../../../core/interfaces/Todo/ITodo'
import { IUpdateTodo } from '../../../../core/interfaces/Todo/IUpdateTodo'
import { IGetTodo } from '../../../../core/interfaces/Todo/IGetTodo'
import { ICreateTodo } from '../../../../core/interfaces/Todo/ICreateTodo'
import { generateGetQuery } from '../../helpers/generateGetQuery'
import { generateUpdateQuery } from '../../helpers/generateUpdateQuery'

export class TodoRepository implements ITodoRepository {
	protected prisma : PrismaClient
	constructor () {
		this.prisma = new PrismaClient()
	}
	async createTodo ( params: ICreateTodo ): Promise<void> {
		const { userId , title , description , taskType } = params

		await this.prisma.todos.create({
			data : {
				title ,
				description ,
				taskType ,
				user : {
					connect : {
						id : userId ,
					} ,
				} ,
			} ,
		})
	}

	async getTodos ( params: IGetTodo ): Promise<ITodo[]> {
		const { userId , tasktype } = params

		const query = generateGetQuery( userId , tasktype )

		const todos = await this.prisma.todos.findMany({
			where : query ,
		})

		return todos
	}

	async updateTodo ( params: IUpdateTodo ): Promise<void> {
		const { id , title , description , taskType , updateType } = params

		const query = generateUpdateQuery({
			id ,
			data : {
				title ,
				description ,
				taskType
			} ,
			updateType ,
		})

		await this.prisma.todos.update( query )
	}

	async deleteTodo ( id: string ): Promise<void> {
		await this.prisma.todos.delete({
			where : {
				id
			}
		})
	}
}

export const todoRepository = new TodoRepository()
