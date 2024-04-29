/* eslint-disable max-lines-per-function */
import { PrismaClient } from '@prisma/client'
import { ICategory } from '../../../../../core/interfaces/category/ICategory'
import { IDeleteCategory } from '../../../../../core/interfaces/category/IDeleteCategory'
import { IGetCategoriesResponse } from '../../../../../core/interfaces/category/IGetCategoriesResponse'
import { IUpdateCategory } from '../../../../../core/interfaces/category/IUpdateCategory'
import { ICategoryRepository } from '../../../../../core/repositories/category/ICategoryRepository'
import { CategoryFormatHelper } from '../../helpers/CategoryFormatHelper'

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

		return CategoryFormatHelper.format( userCategories )
	}

	async updateCategory ( param: IUpdateCategory ): Promise<void> {
		const { name , userCategoryId } = param

		const cateogryAlreadyExists = await this.prisma.category.findUnique({
			where : {
				name
			}
		})

		const userCategory = await this.prisma.userCategory.findUnique({
			where : {
				id : userCategoryId
			}
		})

		if ( cateogryAlreadyExists ) {
			await this.prisma.userCategory.update({
				where : {
					id : userCategoryId ,
				} ,
				data : {
					categoryId : cateogryAlreadyExists.id
				}
			})

			await this.prisma.todoCategory.updateMany({
				where : {
					categoryId : userCategory?.categoryId
				} ,
				data : {
					categoryId : cateogryAlreadyExists.id
				}

			})
		}

		if ( !cateogryAlreadyExists ) {
			const newCategory = await this.prisma.category.create({
				data : {
					name
				} ,
			})

			await this.prisma.userCategory.update({
				where : {
					id : userCategoryId ,
				} ,
				data : {
					categoryId : newCategory.id
				}
			})
		}

		const getNewCategory = await this.prisma.category.findUnique({
			where : {
				name
			}
		})

		await this.prisma.todoCategory.updateMany({
			where : {
				categoryId : userCategory?.categoryId
			} ,
			data : {
				categoryId : getNewCategory?.id
			}
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

			if ( filteredTodos ) {
				filteredTodos.forEach( async ( item ) => {
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
		}

		await this.prisma.userCategory.deleteMany({
			where : {
				id
			} ,
		})
	}
}

export const categoryRepository = new CategoryRepository()
