import { Router , Request , Response } from 'express'
import { UpdateCategory } from '../../../../core/services/Category/UpdateCategory.service'
import { UpdateCategoryController } from '../../../controllers/Category'
import { categoryRepository } from '../../../database/prisma/repositories/userCategory/CategoryRepository'

const updateCategoryRoutes = Router()

const updateCategoryService = new UpdateCategory( categoryRepository )
const updateCategoryController = new UpdateCategoryController( updateCategoryService )

updateCategoryRoutes.patch( '/' ,
	( req:Request , res:Response ) => updateCategoryController.updateCategory( req , res ) )

export { updateCategoryRoutes }
