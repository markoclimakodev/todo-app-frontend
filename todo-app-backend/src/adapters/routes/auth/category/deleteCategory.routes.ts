import { Router , Request , Response } from 'express'
import { DeleteCategory } from '../../../../core/services/Category'
import { DeleteCategoryController } from '../../../controllers/Category/DeleteCategory.controller'
import { categoryRepository } from '../../../database/prisma/repositories/userCategory/CategoryRepository'

const deleteCategoryRoutes = Router()

const deleteCategoryService = new DeleteCategory( categoryRepository )
const deleteCategoryController = new DeleteCategoryController( deleteCategoryService )

deleteCategoryRoutes.delete( '/' ,
	( req:Request , res:Response ) => deleteCategoryController.deleteCategory( req , res ) )

export { deleteCategoryRoutes }
