import { Router } from 'express'
import { commentController } from '../controlers/comment.js'

export const commentRouter = Router()

commentRouter.get('/', commentController.GetComment)

commentRouter.post('/', commentController.AddComment)

commentRouter.put('/:hozzaszolid', commentController.UpdateComment)

commentRouter.delete('/:hozzaszolid', commentController.DeleteComment)
