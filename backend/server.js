const express = require('express')
const app = express()
const port = 8080
const { Pool } = require('pg')

let db = new Pool({
  database: 'chup',
  user: 'postgres',
  password: 'aiching'
})

app.use(express.json())

app.get('/api/users', (req, res, next) => {
  let sql = 'select * from users;'
  db.query(sql)
    .then((db) => res.json(db.rows))
    .catch((err) => next(err))
})

app.get('/api/chuppers', (req, res, next) => {
  let sql = 'select * from chuppers;'
  db.query(sql)
    .then((db) => res.json(db.rows))
    .catch((err) => next(err))
})

app.post('/api/ongoing/:id/:name', (req, res, next) => {
  let sql = `update tasks set status='ongoing',name=$1 where id=$2;`
  db.query(sql, [req.params.name, req.params.id])
    .then((db) => res.json(db.rows))
    .catch((err) => next(err))
})

// app.get('/api/ongoing/:id', (req, res, next) => {
//   let sql = `select * from tasks where status = 'ongoing' and id= $1`
//   db.query(sql, [req.params.id])
//     .then((db) => res.json(db.rows))
//     .catch((err) => next(err))
// })

app.get('/api/completed/tasks', (req, res, next) => {
  let sql = `select * from tasks where status='completed';`
  db.query(sql)
    .then((db) => res.json(db.rows))
    .catch((err) => next(err))
})

app.post('/api/completed/:id', (req, res, next) => {
  let sql = `update tasks set status='completed' where id = $1;`
  db.query(sql, [req.params.id])
    .then((db) => res.json(db.rows))
    .catch((err) => next(err))
})

app.get('/api/pending/tasks', (req, res, next) => {
  let sql = `select * from tasks where status='pending';`
  db.query(sql)
    .then((db) => res.json(db.rows))
    .catch((err) => next(err))
})

app.post('/api/pending/:id', (req, res, next) => {
  let sql = `update tasks set status='pending' where id = $1;`
  db.query(sql, [req.params.id])
    .then((db) => res.json(db.rows))
    .catch((err) => next(err))
})

app.get('/api/ongoing/tasks', (req, res, next) => {
  let sql = `select * from tasks where status='ongoing';`
  db.query(sql)
    .then((db) => res.json(db.rows))
    .catch((err) => next(err))
})

app.get('/api/tasks', (req, res, next) => {
  let sql = 'select * from tasks;'
  db.query(sql)
    .then((db) => res.json(db.rows))
    .catch((err) => next(err))
})

app.get('/api/ongoing/tasks/:id', (req, res, next) => {
  let id = req.params.id
  let sql = `select * from tasks where id = $1;`
  db.query(sql, [id])
    .then((db) => {
      console.log(db.rows[0].name)
      return res.json(db.rows)
    })
    .catch((err) => next(err))
})

app.post('/api/new/tasks', (req, res, next) => {
  let sql =
    'insert into tasks(name, lat, lng, address, date, time, remark, status, price, duration) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);'
  db.query(
    sql,
    [
      req.body.name,
      req.body.lat,
      req.body.lng,
      req.body.address,
      req.body.date,
      req.body.time,
      req.body.remark,
      'pending',
      req.body.price,
      req.body.duration
    ],
    (err, dbRes) => {
      if (err) {
        next(err)
        return
      }

      res.json({ message: 'success' })
    }
  )
})

app.delete('/api/delete/tasks/:taskId', (req, res) => {
  let sql = 'delete from tasks where id=$1'
  db.query(sql, [req.params.taskId], (err, dbRes) => {
    if (err) {
      next(err)
      return
    }
    res.json({ message: 'success' })
  })
})

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}...`)
})
