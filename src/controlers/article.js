import { getArticle, addArticle, updateArticle, deleteArticle } from '../db.js'
import Joi from 'joi'

const addRule = Joi.object({
  cim: Joi.string().required().min(4),
  szoveg: Joi.string().required().min(5).max(100),
  szerzoid: Joi.number().required()
})

async function GetArticle(req, res) {
  res.send(await getArticle())
}

async function AddArticle(req, res) {
  try {
    const { cim, szerzoid, szoveg } = await addRule.validateAsync(req.body)
    await addArticle(cim, szerzoid, szoveg)
    res.send('Kesz')
  } catch (error) {
    res.status(400).send(error)
  }
}

async function UpdateArticle(req, res) {
  const { cikkid } = req.params
  const { cim } = req.body
  res.send(await updateArticle(cikkid, cim))
}

async function DeleteArticle(req, res) {
  const { cikkid } = req.params
  res.send(await deleteArticle(cikkid))
}

export const articleController = {
  GetArticle,
  AddArticle,
  UpdateArticle,
  DeleteArticle
}
