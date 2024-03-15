import { ICategory } from '../../interfaces/category/ICategory'
import { IDeleteCategory } from '../../interfaces/category/IDeleteCategory'
import { IGetCategoriesResponse } from '../../interfaces/category/IGetCategoriesResponse'
import { IUpdateCategory } from '../../interfaces/category/IUpdateCategory'

export interface ICategoryRepository {
createCategory ( param: ICategory ):Promise<void>
getCategories ( userId:string ): Promise<IGetCategoriesResponse[]>
updateCategory( param: IUpdateCategory ):Promise<void>
deleteCategory( param: IDeleteCategory ) : Promise<void>
}
