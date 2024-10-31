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
  //     client.query(`INSERT INTO cikkek (cikkid, cim, datum, szerzoid, szoveg, kateid) VALUES( DEFAULT,'Bejelentette visszavonulását Rafael Nadal ','2024-10-11, 17:36:48', 3,'A 22-szeres Grand Slam-tornagyőztes spanyol klasszis teniszező közösségi oldalán egy négyperces videóban közölte: a Davis-kupa novemberi mérkőzései után befejezi 23 éve tartó profi karrierjét.', 2)
  //       `)

  //       client.query(`INSERT INTO
  //     cikkek (cikkid, cim, datum, szerzoid, szoveg, kateid)
  // VALUES(
  //         DEFAULT,
  //         'Meghalt Frank Stella, Amerika egyik legnevesebb művésze',
  //         '2024-05-05, 10:16:20',
  //         2,
  //         'Meghalt Frank Stella amerikai festő- és szobrászművész, aki az 1950-es évektől kezdve folyamatosan felszínen tudott maradni, és meg tudott újulni, a háború utáni absztrakt mozgalom vezéregyénisége volt. A nem konvencionális geometriájú vásznakkal próbálta elmosni a határt a festészet és a szobrászat között, halálát limfóma okozta. 87 éves volt.',
  //         3)
  //         `)

  //         client.query(`INSERT INTO
  //     cikkek (cikkid, cim, datum, szerzoid, szoveg, kateid)
  // VALUES(
  //         DEFAULT,
  //         'Csökkentené a migrációs áradatot az EU',
  //         '2017-02-05, 19:58:40',
  //         3,
  //         'Az uniós tagországok vezetői elsődleges fontosságú feladatként nevezték meg Líbia stabilitásának elősegítését a Máltán megtartott pénteki informális csúcstalálkozón elfogadott nyilatkozatukban. ',
  //         1)
  //           `)
  //           client.query(`INSERT INTO
  //     cikkek (cikkid, cim, datum, szerzoid, szoveg, kateid)
  // VALUES(
  //         DEFAULT,
  //         'Spanyolország tizenegyesekkel nyerte a Nemzetek Ligáját!',
  //         '2023-06-19, 08:54:40',
  //         3,
  //         'A spanyol válogatott nyerte a labdarúgó Nemzetek Ligáját, miután a vasárnapi döntőben gól nélküli rendes játékidőt és hosszabbítást követően, tizenegyespárbajban verte Horvátországot. ',
  //         1)`)
  // client.query(`INSERT INTO
  //      cikkek (cikkid, cim, datum, szerzoid, szoveg, kateid)
  //  VALUES(
  //         DEFAULT,
  //         'Egy osztrák művész alkotásai megváltoztatják az elképzelésünket a szobrászatrol',
  //         '2023-06-11, 20:02:10',
  //         2,
  //         ' Erwin Wurm Ausztria egyik legjelentősebb művésze, akit a 2017-es velencei biennálé osztrák pavilonja miatt nagyra értékelnek.  Munkái teljesen megzavarják az ismerős, értelmes dolgokról alkotott elképzelésünket. Humorban és kísérletezésben bővelkedő munkásságában a művész gyakran hétköznapi tárgyakat képzel újra, emberi tulajdonságokkal ruházva fel őket.',
  //         3)
  //   `)
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

// export async function deleteFavorite

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
