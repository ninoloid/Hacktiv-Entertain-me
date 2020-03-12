if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3002
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'entertain-me'
const client = new MongoClient(url)
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

client.connect(err => {
  if (err) console.log(err)
  else {
    const db = client.db(dbName)
    app.use((req, res, next) => {
      req.db = db
      next()
    })
    app.use(require('./routes'))
    app.use(require('./middlewares/errorHandler'))
  }
})

app.listen(port, () => console.log('TV series server running on port', port))