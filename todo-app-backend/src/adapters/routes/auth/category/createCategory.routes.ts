import { Router , Request , Response } from 'express'
import { CreateCategoryController } from '../../../controllers/Category'
import { categoryRepository } from '../../../../external/prisma/repositories/category/CategoryRepository'
import { CreateCategory } from '../../../../core/services/Category/CreateCategory.service'

const createCategoryRoutes = Router()

const createCategoryService = new CreateCategory( categoryRepository )
const createCategoryController = new CreateCategoryController( createCategoryService )

createCategoryRoutes.post( '/' ,
	( req:Request , res:Response ) => createCategoryController.createCategory( req , res ) )

export { createCategoryRoutes }
