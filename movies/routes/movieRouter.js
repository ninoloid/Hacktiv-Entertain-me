const router = require('express').Router()
const movieController = require('../controllers/movieController')

router.get('/', movieController.showMovies)
router.post('/', movieController.addMovies)
router.get('/:id', movieController.showOneMovie)
router.patch('/:id', movieController.updateMovies)
router.delete('/:id', movieController.deleteMovie)

module.exports = router