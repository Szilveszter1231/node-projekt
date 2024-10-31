import { getUsers, addUser, updateUsers, deleteUsers } from '../db.js'
import Joi from 'joi'

const addRule =Joi.object({
  nev:Joi.string().required().min(3).max(10),
  email:Joi.string().required()
})

async function GetUsers(req, res) {
  res.send(await getUsers())
}

async function AddUser(req, res) {
  try{
  const { email, nev } = await addRule.validateAsync(req.body)
  await addUser(nev, email)
  res.send('Megerkezett a valasz')
  } catch(error) { 
    res.status(400).send(error)
  }
}

async function UpdateUsers(req, res) { 
  try {
  const { id } = req.params
  const { email, nev } = await addRule.validateAsync(req.body)
  res.send(await updateUsers(id, nev, email))
  } catch(error) {
    res.status(400).send(error)
  }
}

async function DeleteUsers(req, res) {
  const { id } = req.params
  res.send(await deleteUsers(id))
}

export const userController = {
  GetUsers,
  AddUser,
  UpdateUsers,
  DeleteUsers
}
