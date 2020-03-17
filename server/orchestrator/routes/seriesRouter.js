const router = require('express').Router()
const controller = require('../controllers')

router.get('/', controller.getSeries)
router.post('/', controller.addSeries)
router.delete('/:id', controller.deleteSeries)
router.get('/:id', controller.getOneSeries)
router.patch('/:id', controller.editSeries)

module.exports = router