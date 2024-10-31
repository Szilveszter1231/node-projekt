import { Router } from 'express'
import { favoriteController } from '../controlers/favorite.js'

export const favoriteRouter = Router()

favoriteRouter.get('/', favoriteController.GetFavorite)
favoriteRouter.post('/', favoriteController.AddFavorite)
