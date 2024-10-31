import express from 'express'
import {
  getCategory,
  deleteUsers,
  deleteCategory,
  addCategory,
  createCategories,
  getUsers,
  addUser,
  createUser,
  updateUsers,
  updateCategory,
  addArticle,
  getArticle,
  updateArticle,
  addFavorite,
  getFavorite,
  getComment,
  addComment,
  updateComment,
  deleteComment
  // createFavorite,
  // createArticle,
  // createComment
} from './db.js'

import morgan from 'morgan'
import bodyParser from 'body-parser'
import { userRouter } from './roods/user.js'
import { categoryRouter } from './roods/category.js'
import { articleRouter } from './roods/article.js'
import { favoriteRouter } from './roods/favorite.js'
import { commentRouter } from './roods/comment.js'
const app = express()

const port = 3000
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/users', userRouter)
app.use('/kategoriak', categoryRouter)
app.use('/articles', articleRouter)
app.use('/favorits', favoriteRouter)
app.use('/comments', commentRouter)

//Felhasznalok

app.get('/users', async (req, res) => {
  res.send(await getUsers())
})

app.post('/users', async (req, res) => {
  console.log(req.body)
  const { nev, email } = req.body
  await addUser(nev, email)
  res.send('Megerkezett a valasz')
})

app.put('/users/:id', async (req, res) => {
  const { id } = req.params
  const { email, nev } = req.body
  res.send(await updateUsers(id, nev, email))
})

app.get('/users/:id', async (req, res) => {
  res.send(await addUser)
})

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params
  res.send(await deleteUsers(id))
})

//Kategoriak
app.get('/categories', async (req, res) => {
  res.send(await getCategory())
})

app.post('/categories', async (req, res) => {
  console.log(req.body)
  const { nev } = req.body
  await addCategory(nev)
  res.send('Megerkezett a valasz')
})

app.put('/categories/:id', async (req, res) => {
  const { id } = req.params
  const { nev } = req.body
  res.send( await updateCategory(id,nev))
})

app.delete('/categories/:id', async (req, res) => {
  const { id } = req.params
  res.send(await deleteCategory(id))
})

// Cikkek

app.get('/articles', async (req, res) => {
  res.send(await getArticle())
})

app.post('/articles', async (req, res) => {
  console.log(req.body)
  const { cim, szoveg, szerzoid } = req.body
  await addArticle(cim, szerzoid, szoveg)
  res.send('Kesz')
})

app.put('/articles/:cikkid', async (req, res) => {
  const { cikkid } = req.params
  const { cim } = req.body
  res.send(await updateArticle(cikkid, cim))
})
app.delete('/article/:cikkid', async (req, res) => {
  const { cikkid } = req.params
  res.send(await deleteArticle(cikkid))
})

// Kedvencek

app.get('/favorits', async (req, res) => {
  res.send(await getFavorite())
})

app.post('/favorits', async (req, res) => {
  console.log(req.body)
  const { felhid, cikkid } = req.body
  await addFavorite(felhid, cikkid)
  res.send('Hozzaadva')
})

// app.put('/favorits', async (req,res)=>{
//   const {felhid} = req.params
//   const {id}=
//   res.send(await updateArticle(felhid,id))
//   })

// Hozzaszolasok

app.get('/comments', async (req, res) => {
  res.send(await getComment())
})

app.post('/comments', async (req, res) => {
  console.log(req.body)
  const { felhid, cikkid, szoveg } = req.body
  await addComment(felhid, cikkid, szoveg)
  res.send('Hozzaadva')
})

app.put('/comments/:hozzaszolid', async (req, res) => {
  const {hozzaszolid} = req.params
  const {szoveg} = req.body
  res.send(await updateComment(hozzaszolid,szoveg))
})
app.delete('/comments/:hozzaszolid', async (req, res) => {
  const { hozzaszolid } = req.body
  res.send(await deleteComment(hozzaszolid))
})

app.listen(port, () => {
  console.log(`A szerver fut a http://localhost:${port} cimen`)
  // createComment()
  createUser()
  getUsers()
  createCategories()
  1
})
