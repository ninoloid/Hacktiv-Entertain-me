if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/entertainme', require('./routes'))

app.listen(PORT, () => console.log('Orchestrator running on port', PORT))