import { PrismaClient } from '@prisma/client'
import { ITodoRepository } from '../../../../core/repositories/todo/ITodoRepository'
import { ITodo } from '../../../../core/interfaces/Todo/ITodo'
import { IUpdateTodo } from '../../../../core/interfaces/Todo/IUpdateTodo'
import { IGetTodo } from '../../../../core/interfaces/Todo/IGetTodo'

export class TodoRepository implements ITodoRepository {
	protected prisma : PrismaClient
	constructor () {
		this.prisma = new PrismaClient()
	}

	async createTodo ( todoData: ITodo ): Promise<void> {
		await this.prisma.todos.create({
			data : todoData ,
		})
	}

	async getTodos ( params: IGetTodo ): Promise<ITodo[]> {
		const { id , category } = params

		const todos = await this.prisma.todos.findMany({
			where : {
				userId     : id ,
				categories : {
					contains : category
				}
			}
		})

		return todos
	}

	async updateTodo ( params: IUpdateTodo ): Promise<void> {
		const { id , updateInfo } = params

		await this.prisma.todos.update({
			where : {
				id
			} ,
			data : {
				...updateInfo
			}
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
