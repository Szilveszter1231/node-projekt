import { getComment, addComment, updateComment, deleteComment } from '../db.js'
import Joi from 'joi'

const addRule=Joi.object({
  szoveg:Joi.string().required().min(10).max(600),
  cikkid:Joi.number().required()
})

async function GetComment(req, res) {
  res.send(await getComment())
}


async function AddComment(req, res) {
  try{
  const { felhid, cikkid, szoveg } = await addRule.validateAsync(req.body)
  await addComment(felhid, cikkid, szoveg)
  res.send('Hozzaadva')
  } catch(error) {
    res.status(400).send(error)
  }
}

async function UpdateComment(req,res) {
  const {hozzaszolid} = req.params
  const {szoveg} = req.body
  res.send(await updateComment(hozzaszolid,szoveg))
}

async function DeleteComment(req, res) {
  const { hozzaszolid } = req.body
  res.send(await deleteComment(hozzaszolid))
}

export const commentController = {
  GetComment,
  AddComment,
  UpdateComment,
   DeleteComment
}
