/* eslint-disable max-lines-per-function */
import { PrismaClient } from '@prisma/client'
import { ICategoryRepository } from '../../../../core/repositories/category/ICategoryRepository'
import { ICategory } from '../../../../core/interfaces/category/ICategory'
import { IUpdateCategory } from '../../../../core/interfaces/category/IUpdateCategory'
import { IGetCategoriesResponse } from '../../../../core/interfaces/category/IGetCategoriesResponse'
import { IDeleteCategory } from '../../../../core/interfaces/category/IDeleteCategory'

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

		const category = await this.prisma.category.findUnique({
			where : {
				name
			}
		})

		if ( category ) {
			await this.prisma.userCategory.update({
				where : {
					id ,
				} ,
				data : {
					categoryId : category.id
				} ,
			})
		}
	}

	async deleteCategory ( param: IDeleteCategory ): Promise<void> {
		const { id } = param

		await this.prisma.userCategory.deleteMany({
			where : {
				id
			} ,
		})
	}
}

export const categoryRepository = new CategoryRepository()
