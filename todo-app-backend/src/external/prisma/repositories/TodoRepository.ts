import { PrismaClient } from '@prisma/client'
import { ITodoRepository } from '../../../core/repositories/ITodoRepository'
import { ITodo } from '../../../core/interfaces/Todo/ITodo'
import { IInfoToUpdate } from '../../../core/interfaces/Todo/IInfoToUpdate'
import { IGetTodo } from '../../../core/interfaces/Todo/IGetTodo'

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

	async getTodos ({ id , completed }: IGetTodo ): Promise<ITodo[]> {
		const todos = await this.prisma.todos.findMany({
			where : {
				userId    : id ,
				completed : completed ,
			}
		})

		return todos
	}

	async updateTodo ( infoToUpdate: IInfoToUpdate ): Promise<void> {
		await this.prisma.todos.update({
			where : {
				id : infoToUpdate.id
			} ,
			data : {
				...infoToUpdate.infoToUpdate
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
