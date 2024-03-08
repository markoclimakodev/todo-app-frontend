import { Router } from 'express'
import { AuthenticationMiddleware } from '../../../middlewares/AuthenticationMiddleware'
import { createCategoryRoutes } from './createCategory.routes'
import { getCategoriesRoutes } from './getCategories.routes'
import { updateCategoryRoutes } from './updateCategory.routes'
import { deleteCategoryRoutes } from './deleteCategory.routes'

const authenticateToken = AuthenticationMiddleware.authenticateToken

const categoriesRoutes = Router()

categoriesRoutes.use( authenticateToken )

categoriesRoutes.use( '/create' , createCategoryRoutes )

categoriesRoutes.use( '/get' , getCategoriesRoutes )

categoriesRoutes.use( '/update' , updateCategoryRoutes )

categoriesRoutes.use( '/delete' , deleteCategoryRoutes )

export default categoriesRoutes
