import { Router , Request , Response } from 'express'
import { GetCategories } from '../../../../core/services/Category/GetCategories.service'
import { GetCategoriesController } from '../../../controllers/Category'
import { categoryRepository } from '../../../database/prisma/repositories/category/CategoryRepository'

const getCategoriesRoutes = Router()

const getCategoriesService = new GetCategories( categoryRepository )
const getCategoriesController = new GetCategoriesController( getCategoriesService )

getCategoriesRoutes.get( '/' ,
	( req:Request , res:Response ) => getCategoriesController.getCategories( req , res ) )

export { getCategoriesRoutes }
