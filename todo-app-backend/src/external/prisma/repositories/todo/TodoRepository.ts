import { PrismaClient } from '@prisma/client'
import { ITodoRepository } from '../../../../core/repositories/todo/ITodoRepository'

import { ICreateTodo } from '../../../../core/interfaces/Todo/ICreateTodo'
import { ITodo } from '../../../../core/interfaces/Todo/ITodo'
import { IGetTodos } from '../../../../core/interfaces/Todo/IGetTodos'
import { generateGetTodosQuery } from '../../helpers/generateGetTodosQuery'

export class TodosRepository implements ITodoRepository {
	protected prisma: PrismaClient
	constructor () {
		this.prisma = new PrismaClient()
	}

	async createTodo ( params: ICreateTodo ): Promise<void> {
		const { title , description , userId , categoryName } = params

		const category = await this.prisma.category.findUnique({
			where : {
				name : categoryName
			}
		})

		const todo = await this.prisma.todo.create({
			data : {
				title ,
				description ,
				userId ,
			}
		})

		if ( category ) {
			await this.prisma.todoCategory.create({
				data : {
					categoryId : category.id ,
					todoId     : todo.id
				}
			})
		}
	}

	async getTodos ( params: IGetTodos ): Promise<ITodo[]> {
		const { userId , categoryName } = params

		const category = await this.prisma.category.findUnique({
			where : {
				name : categoryName
			}
		})

		const query = generateGetTodosQuery( userId , categoryName , category )

		const todos = await this.prisma.todo.findMany( query as any )

		return todos
	}
}

export const todosRepository = new TodosRepository()
