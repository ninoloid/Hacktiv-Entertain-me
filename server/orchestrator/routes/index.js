const router = require('express').Router()
const movieRouter = require('./movieRouter')
const seriesRouter = require('./seriesRouter')
const { getAllData } = require('../controllers')

router.get('/', getAllData)

router.use('/movies', movieRouter)
router.use('/series', seriesRouter)

module.exports = router