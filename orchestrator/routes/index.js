const express = require('express')
const router = express.Router()
const controller = require('../controllers')

router.get('/', controller.getAllData)
router.get('/movies', controller.getMovies)
router.post('/movies', controller.addMovies)
router.get('/series', controller.getSeries)
router.delete('/movies/:id', controller.deleteMovies)
router.delete('/series/:id', controller.deleteSeries)

module.exports = router