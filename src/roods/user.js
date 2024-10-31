import { Router } from 'express'
import { userController } from '../controlers/user.js'

export const userRouter = Router()

userRouter.get('/', userController.GetUsers)

userRouter.post('/', userController.AddUser)

userRouter.put('/:id', userController.UpdateUsers)

userRouter.delete('/:id', userController.DeleteUsers)
