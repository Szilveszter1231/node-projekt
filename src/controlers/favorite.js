import { getFavorite, addFavorite } from '../db.js'

async function GetFavorite(req, res) {
  res.send(await getFavorite())
}

async function AddFavorite(req, res) {
  const { felhid, cikkid } = req.body
  await addFavorite(felhid, cikkid)
  res.send('Hozzaada')
}

export const favoriteController = {
  GetFavorite,
  AddFavorite
}
