// import {query} from 'expres'
import { query } from 'express'
import pg from 'pg'

const { Client } = pg

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'UJ-STYXA',
  password: '991231',
  port: 5432
})

//Users
await client.connect()

export function createUser() {
  client.query(`
        CREATE TABLE IF NOT EXISTS felhasznalok (
            felhid INT GENERATED ALWAYS AS IDENTITY,
            nev VARCHAR(100) NOT NULL,
            email VARCHAR(100),
            datum TIMESTAMP,
            PRIMARY KEY (felhid)
    )`)
}

export async function addUser(nev, email) {
  await client.query(`
        INSERT INTO felhasznalok(felhid,nev,email,datum)
        VALUES(default,'${nev}', '${email}',NOW())`)
  // await client.query(`
  //        INSERT INTO felhasznalok
  //      VALUES(default,'Kata', 'kata@mail.com',NOW())`),
  // await client.query(`
  //         INSERT INTO felhasznalok
  //       VALUES(default,'Dani', 'dani@mail.com',NOW())`),
  // await client.query(`
  //              INSERT INTO felhasznalok
  //            VALUES(default,'Csaba', 'csaba@mail.com',NOW())`)
}

export async function getUsers() {
  const users = await client.query(`
        SELECT * FROM felhasznalok`)
  return users.rows
}

export async function updateUsers(id, nev, email) {
  const users = await client.query(`
        UPDATE felhasznalok SET nev = '${nev}', email='${email}' WHERE felhid=${id}`)
  return users.rows
}

export async function deleteUsers(id) {
  const users = await client.query(`
          DELETE FROM felhasznalok WHERE felhid=${id}`)
  return users.rows
}
//Kategoriak
export function createCategories() {
  client.query(`CREATE TABLE IF NOT EXISTS kategoriak(
        kateid int GENERATED ALWAYS AS IDENTITY,
        nev VARCHAR(80),
        PRIMARY KEY (kateid))
        `)
}

export function addCategory(nev) {
  client.query(`INSERT INTO kategoriak 
               VALUES (DEFAULT, '${nev}')`)
//   client.query(`INSERT INTO kategoriak
//   VALUES (DEFAULT, 'Hírek')`),
//     client.query(`INSERT INTO kategoriak
//   VALUES (DEFAULT, 'Művészet')`),
//     client.query(`INSERT INTO kategoriak
//   VALUES (DEFAULT, 'Egészség')`)
}

export async function getCategory() {
  const category = await client.query(`
    SELECT * FROM kategoriak`)
  return category.rows
}

export async function updateCategory(id,nev) {
  const category = await client.query(
    `UPDATE kategoriak SET nev ='${nev}' WHERE kateid='${id}'`
  )
  return category.rows
}

export async function deleteCategory(id) {
  const category = await client.query(`
    DELETE FROM kategoriak WHERE kateid=${id}`)
  return category.rows
}

// Cikkek

export function createArticle() {
  client.query(`
        CREATE TABLE cikkek(
        cikkid Int GENERATED ALWAYS as IDENTITY,
        cim VARCHAR (150),
        datum TIMESTAMP,
        szerzoid int NOT null,
        szoveg VARCHAR (500),
        kateid int not NULL,
        PRIMARY key (cikkid),
        FOREIGN KEY (szerzoid) REFERENCES felhasznalok (felhid) ON UPDATE NO ACTION ON DELETE CASCADE,
        FOREIGN KEY (kateid) REFERENCES kategoriak(kateid) ON UPDATE NO ACTION ON DELETE CASCADE
    )`)
}

export async function getArticle() {
  const article = await client.query(`SELECT cim FROM cikkek`)
  return article.rows
}

export async function addArticle(cim, szerzoid, szoveg) {
  await client.query(`INSERT INTO
    cikkek (cikkid, cim, datum, szerzoid, szoveg, kateid)
VALUES(
        DEFAULT,
        '${cim}',
        'NOW()',
        '${szerzoid}',
        '${szoveg}',
        4
    )
    `)

}

export async function updateArticle(cikkid, cim) {
  const article = await client.query(
    `UPDATE cikkek SET '${cim}' WHERE cikkid='${cikkid}'`
  )
  return article.rows
}

export async function deleteArticle(cikkid) {
  const article = await client.query(`DELETE FROM cikkek WHERE cikkid='${cikkid}'`)
}

// KEDVENCEK

export async function createFavorite() {
  client.query(`
        CREATE TABLE IF NOT EXISTS kedvencek (
        felhid int not NULL,
        cikkid int not NULL,
        FOREIGN KEY (felhid) REFERENCES felhasznalok (felhid) ON UPDATE NO ACTION ON DELETE CASCADE,
        FOREIGN KEY (cikkid) REFERENCES cikkek(cikkid) ON UPDATE NO ACTION ON DELETE CASCADE    
     )`)
}

export async function getFavorite() {
  await client.query(`SELECT felhid FROM kedvencek`)
}

export async function addFavorite(felhid, cikkid) {
  await client.query(`INSERT INTO kedvencek(felhid,cikkid)
    VALUES('${felhid}','${cikkid}')`)
}

// export async function updateFavorite(felhid,id){
//   const favorit= await client.query(`UPDATE kedvencek SET'${felhid}' WHERE cikkid='${id}'`)
// }


//  Hozzaszolasok

export function createComment() {
  client.query(`
        CREATE TABLE hozzaszolasok (
        hozzaszolid int GENERATED ALWAYS as IDENTITY,
        felhid int not NULL,
        cikkid int not null,
        datum TIMESTAMP,
        szoveg VARCHAR (1000),
        PRIMARY KEY (hozzaszolid),
        FOREIGN KEY (felhid) REFERENCES felhasznalok (felhid) ON UPDATE NO ACTION ON DELETE CASCADE,
        FOREIGN KEY (cikkid) REFERENCES cikkek(cikkid) ON UPDATE NO ACTION ON DELETE CASCADE
    )`)
}
export async function getComment() {
  client.query(`SELECT szoveg FROM hozzaszolasok`)
}

export async function addComment(felhid, cikkid, szoveg) {
  await client.query(`INSERT INTO
    hozzaszolasok(hozzaszolid, felhid, cikkid, datum, szoveg)
VALUES(
        DEFAULT,
        '${felhid}',
        '${cikkid}',
        'NOW()',
        '${szoveg}'
    )
  `)
}

export async function updateComment(hozzaszolid, szoveg) {
  await client.query(
    `UPDATE hozzaszolasok SET '${szoveg}' WHERE hozzaszolid='${hozzaszolid}' `
  )
}

export async function deleteComment(hozzaszolid) {
  await client.query(`DELETE FROM hozzaszolasok WHERE hozzaszolid='${hozzaszolid}'`)
}
