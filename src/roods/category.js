import { Router } from 'express'
import { categoryController } from '../controlers/category.js'

export const categoryRouter = Router()

categoryRouter.get('/', categoryController.GetCategory)

categoryRouter.post('/', categoryController.AddCategory)

categoryRouter.put('/:id', categoryController.UpdateCategory)

categoryRouter.delete('/:id', categoryController.DeleteCategory)
