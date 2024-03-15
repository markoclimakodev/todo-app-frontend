import { IUpdateCategory } from '../../interfaces/category/IUpdateCategory'
import { ICategoryRepository } from '../../repositories/category/ICategoryRepository'
import { UseCase } from '../../useCases/useCase'

export class UpdateCategory implements UseCase<IUpdateCategory , void> {
	constructor ( private readonly categoryRepository: ICategoryRepository ) {}

	async execute ( param: IUpdateCategory ): Promise<void> {
		const { name , id } = param

		await this.categoryRepository.updateCategory({
			name ,
			id ,
		})
	}
}
