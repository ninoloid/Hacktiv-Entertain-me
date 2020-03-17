const router = require('express').Router()
const tvRouter = require('./tvRouter')

router.use('/tv', tvRouter)

module.exports = router