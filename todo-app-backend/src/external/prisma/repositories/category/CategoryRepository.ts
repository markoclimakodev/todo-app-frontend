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
		const { name } = param
		const category = await this.prisma.category.findUnique({
			where : {
				name
			}
		})

		if ( !category ) {
			await this.prisma.category.create({
				data : {
					name
				}
			})
		}
	}

	async getCategories (): Promise<IGetCategoriesResponse[]> {
		const categories = await this.prisma.category.findMany()

		return categories.map( ( category ) => ({
			id   : category.id ,
			name : category.name
		}) )
	}

	async updateCategory ( param: IUpdateCategory ): Promise<void> {
		const { name , id } = param

		await this.prisma.category.update({
			where : {
				id
			} ,
			data : {
				name
			}
		})
	}

	async deleteCategory ( param: IDeleteCategory ): Promise<void> {
		const { id } = param

		await this.prisma.category.delete({
			where : {
				id
			}
		})
	}
}

export const categoryRepository = new CategoryRepository()
