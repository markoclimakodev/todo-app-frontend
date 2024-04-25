import { PrismaClient } from '@prisma/client'

import { TodoFormatHelper } from '../../helpers/TodoFormatHelper'
import { ITodoRepository } from '../../../../../core/repositories/todo/ITodoRepository'
import { ICreateTodo } from '../../../../../core/interfaces/Todo/ICreateTodo'
import { IDeleteTodo } from '../../../../../core/interfaces/Todo/IDeleteTodo'
import { IGetTodos } from '../../../../../core/interfaces/Todo/IGetTodos'
import { ITodo } from '../../../../../core/interfaces/Todo/ITodo'
import { IUpdateTodo } from '../../../../../core/interfaces/Todo/IUpdateTodo'
import { IAddImportant } from '../../../../../core/interfaces/Todo/IAddImportant'
import { IGetTodoStatus } from '../../../../../core/interfaces/Todo/IGetTodoStatus'
import { IGetTodoById } from '../../../../../core/interfaces/Todo/IGetTodoById'

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
				userId
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

	async getImportantsTodos ( params: IGetTodoStatus ): Promise<ITodo[]> {
		const { userId } = params

		const todos = await this.prisma.todo.findMany({
			where : {
				userId ,
				important : true
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

	async getCompletedTodos ( params: IGetTodoStatus ): Promise<ITodo[]> {
		const { userId } = params

		const todos = await this.prisma.todo.findMany({
			where : {
				userId ,
				completed : true
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

	async getTodoById ( params: IGetTodoById ): Promise<ITodo> {
		const { todoId } = params
		const todo = await this.prisma.todo.findUnique({
			where : {
				id : todoId
			} ,
			include : {
				TodoCategory : {
					select : {
						category : true
					}
				}
			}
		})

		if ( !todo ) {
			throw new Error( 'Todo not found' )
		}

		return TodoFormatHelper.formatOne( todo )
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
