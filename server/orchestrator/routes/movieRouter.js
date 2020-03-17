const router = require('express').Router()
const controller = require('../controllers')

router.get('/', controller.getMovies)
router.post('/', controller.addMovies)
router.delete('/:id', controller.deleteMovies)
router.get('/:id', controller.getOneMovie)
router.patch('/:id', controller.editMovie)

module.exports = router