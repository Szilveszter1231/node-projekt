import {
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory
} from '../db.js'
import Joi from 'joi'

const addRule=Joi.object({
  nev:Joi.string().required().min(3)
})

async function GetCategory(req, res) {
  res.send(await getCategory)
}

async function AddCategory(req, res) {
  try{
  const { nev } = await addRule.validateAsync(req.body)
  await addCategory(nev)
  res.send('Megerkezett a valasz')
  } catch(error) {
    res.status(400).send(error)
  }
}

async function UpdateCategory(req, res) {
  try{
  const { id } = req.params
  const { nev } = await addRule.validateAsync(req.body)
  res.send(await updateCategory(id, nev))
  } catch(error) {
    res.status(400).send(error)
  }
}

async function DeleteCategory(req, res) {
  const { id } = req.params
  res.send(await deleteCategory(id))
}

export const categoryController = {
  GetCategory,
  AddCategory,
  UpdateCategory,
  DeleteCategory
}
