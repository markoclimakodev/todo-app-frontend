import { ICategory } from '../../interfaces/category/ICategory'
import { ICategoryRepository } from '../../repositories/category/ICategoryRepository'
import { UseCase } from '../../useCases/useCase'

export class CreateCategory implements UseCase<ICategory , void> {
	constructor ( private readonly categoryRepository: ICategoryRepository ) {}

	async execute ( params: ICategory ): Promise<void> {
		const { name } = params

		await this.categoryRepository.createCategory({
			name
		})
	}
}
