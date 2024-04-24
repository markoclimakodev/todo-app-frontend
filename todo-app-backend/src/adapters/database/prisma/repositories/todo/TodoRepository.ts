import { PrismaClient } from '@prisma/client'

import { TodoFormatHelper } from '../../helpers/TodoFormatHelper'
import { ITodoRepository } from '../../../../../core/repositories/todo/ITodoRepository'
import { ICreateTodo } from '../../../../../core/interfaces/Todo/ICreateTodo'
import { IDeleteTodo } from '../../../../../core/interfaces/Todo/IDeleteTodo'
import { IGetTodos } from '../../../../../core/interfaces/Todo/IGetTodos'
import { ITodo } from '../../../../../core/interfaces/Todo/ITodo'
import { IUpdateTodo } from '../../../../../core/interfaces/Todo/IUpdateTodo'
import { IAddImportant } from '../../../../../core/interfaces/Todo/IAddImportant'
import { IGetImportantsTodos } from '../../../../../core/interfaces/Todo/IGetImportantsTodos'
import { IGetCompletedTodos } from '../../../../../core/interfaces/Todo/IGetCompletedTodos'

export class TodosRepository implements ITodoRepository {
	protected prisma: PrismaClient
	constructor () {
		this.prisma = new PrismaClient()
	}

	async createTodo ( params: ICreateTodo ): Promise<void> {
		const { title , description , userId , category } = params

		const existingCategory = await this.prisma.category.findUnique({
			where : {
				name : category
			}
		})

		const todo = await this.prisma.todo.create({
			data : {
				title ,
				description ,
				userId ,
			}
		})

		if ( existingCategory ) {
			await this.prisma.todoCategory.create({
				data : {
					categoryId : existingCategory.id ,
					todoId     : todo.id
				}
			})
		}
	}

	async getTodos ( params: IGetTodos ): Promise<ITodo[]> {
		const { userId , category } = params

		const existingCategory = await this.prisma.category.findUnique({
			where : {
				name : category
			}
		})

		const todos = await this.prisma.todo.findMany({
			where : {
				userId ,
				TodoCategory : existingCategory ? {
					some : {
						categoryId : existingCategory.id
					}
				} : undefined
			} ,
			include : {
				TodoCategory : {
					select : {
						category : true
					}
				}
			}
		})

		return TodoFormatHelper.format( todos || [] )
	}

	async getImportantsTodos ( params: IGetImportantsTodos ): Promise<ITodo[]> {
		const { id , important } = params

		const todos = await this.prisma.todo.findMany({
			where : {
				userId : id ,
				important
			} ,
			include : {
				TodoCategory : {
					select : {
						category : true
					}
				}
			}
		})

		return TodoFormatHelper.format( todos || [] )
	}

	async getCompletedTodos ( params: IGetCompletedTodos ): Promise<ITodo[]> {
		const { id , completed } = params

		const todos = await this.prisma.todo.findMany({
			where : {
				userId : id ,
				completed
			} ,
			include : {
				TodoCategory : {
					select : {
						category : true
					}
				}
			}
		})

		return TodoFormatHelper.format( todos || [] )
	}

	async updateTodo ( params: IUpdateTodo ): Promise<void> {
		const { title , description , category , id } = params
		const categoryExists = await this.prisma.category.findUnique({
			where : {
				name : category
			}
		})

		await this.prisma.todo.update({
			where : {
				id
			} ,
			data : {
				title ,
				description ,
				TodoCategory : {
					update : {
						where : {
							todoId : id
						} ,
						data : {
							categoryId : categoryExists?.id
						}
					}
				}
			}
		})
	}

	async addImportant ( params: IAddImportant ): Promise<void> {
		const { id , important } = params

		await this.prisma.todo.update({
			where : {
				id
			} ,
			data : {
				important
			}
		})
	}

	async deleteTodo ( params: IDeleteTodo ): Promise<void> {
		const { id } = params

		await this.prisma.todo.delete({
			where : {
				id
			}
		})
	}
}

export const todosRepository = new TodosRepository()
