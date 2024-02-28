import { PrismaClient } from '@prisma/client'
import { ITodoRepository } from '../../../../core/repositories/todo/ITodoRepository'
import { ITodo } from '../../../../core/interfaces/Todo/ITodo'
import { IUpdateTodo } from '../../../../core/interfaces/Todo/IUpdateTodo'
import { IGetTodo } from '../../../../core/interfaces/Todo/IGetTodo'
import { ICreateTodo } from '../../../../core/interfaces/Todo/ICreateTodo'
import { getTodosQueryHelper } from '../../helpers/queryHelper'

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

		const query = getTodosQueryHelper( userId , tasktype )

		const todos = await this.prisma.todos.findMany({
			where : query ,
		})

		return todos
	}

	async updateTodo ( params: IUpdateTodo ): Promise<void> {
		const { id , title , description , taskType } = params

		await this.prisma.todos.update({
			where : {
				id : id
			} ,
			data : {
				title ,
				description ,
				taskType ,
			} ,
		})
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
