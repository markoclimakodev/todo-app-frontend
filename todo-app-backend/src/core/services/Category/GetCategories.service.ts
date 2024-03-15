import { IGetCategoriesResponse } from '../../interfaces/category/IGetCategoriesResponse'
import { ICategoryRepository } from '../../repositories/category/ICategoryRepository'
import { UseCase } from '../../useCases/useCase'

export class GetCategories implements UseCase<string , IGetCategoriesResponse[]> {
	constructor ( private readonly categoryRepository: ICategoryRepository ) {}

	async execute ( userId:string ): Promise<IGetCategoriesResponse[]> {
		return await this.categoryRepository.getCategories( userId )
	}
}
