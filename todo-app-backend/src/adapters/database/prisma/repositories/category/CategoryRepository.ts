/* eslint-disable max-lines-per-function */
import { PrismaClient } from '@prisma/client'
import { ICategory } from '../../../../../core/interfaces/category/ICategory'
import { IDeleteCategory } from '../../../../../core/interfaces/category/IDeleteCategory'
import { IGetCategoriesResponse } from '../../../../../core/interfaces/category/IGetCategoriesResponse'
import { IUpdateCategory } from '../../../../../core/interfaces/category/IUpdateCategory'
import { ICategoryRepository } from '../../../../../core/repositories/category/ICategoryRepository'

export class CategoryRepository implements ICategoryRepository {
	protected prisma: PrismaClient
	constructor () {
		this.prisma = new PrismaClient()
	}

	async createCategory ( param: ICategory ): Promise<void> {
		const { name , userId } = param
		const existingUserCategory = await this.prisma.userCategory.findFirst({
			where : {
				userId ,
				category : {
					name ,
				} ,
			} ,
		})

		if ( !existingUserCategory ) {
			await this.prisma.userCategory.create({
				data : {
					category : {
						connectOrCreate : {
							where : {
								name
							} ,
							create : {
								name
							} ,
						} ,
					} ,
					user : {
						connect : {
							id : userId ,
						} ,
					} ,
				} ,
			})
		}
	}

	async getCategories ( userId: string ): Promise<IGetCategoriesResponse[]> {
		const userCategories = await this.prisma.userCategory.findMany({
			where : {
				userId ,
			} ,
			include : {
				category : true ,
			} ,
		})

		return userCategories.map( ( userCategory ) => ({
			id   : userCategory.id ,
			name : userCategory.category.name ,
		}) )
	}

	async updateCategory ( param: IUpdateCategory ): Promise<void> {
		const { name , id } = param

		let category = await this.prisma.category.findUnique({
			where : {
				name
			}
		})

		if ( !category ) {
			category = await this.prisma.category.create({
				data : {
					name
				}
			})
		}

		await this.prisma.userCategory.update({
			where : {
				id
			} ,
			data : {
				categoryId : category.id
			} ,
		})
	}

	async deleteCategory ( param: IDeleteCategory ): Promise<void> {
		const { id } = param

		const existingCategory = await this.prisma.userCategory.findUnique({
			where : {
				id
			}
		})

		if ( existingCategory ) {
			const filteredTodos = await this.prisma.todoCategory.findMany({
				where : {
					categoryId : existingCategory.categoryId
				}
			})

			filteredTodos.map( async ( item ) => {
				await this.prisma.todo.deleteMany({
					where : {
						TodoCategory : {
							every : {
								categoryId : item.categoryId
							}
						}
					}
				})
			})
		}

		await this.prisma.userCategory.deleteMany({
			where : {
				id
			} ,
		})
	}
}

export const categoryRepository = new CategoryRepository()
