const router = require('express').Router()
const seriesController = require('../controllers/seriesController')

router.get('/', seriesController.showAllSeries)
router.post('/', seriesController.addSeries)
router.get('/:id', seriesController.showOneSeries)
router.patch('/:id', seriesController.updateSeries)
router.delete('/:id', seriesController.deleteSeries)

module.exports = router