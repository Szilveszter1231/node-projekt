import { Router } from 'express'
import { articleController } from '../controlers/article.js'

export const articleRouter = Router()

articleRouter.get('/', articleController.GetArticle)
articleRouter.post('/', articleController.AddArticle)
articleRouter.put('/:cikkid', articleController.UpdateArticle)
articleRouter.delete('/:cikkid', articleController.DeleteArticle)
