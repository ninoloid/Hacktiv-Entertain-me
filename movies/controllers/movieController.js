const Movie = require('../models/movie')

module.exports = {
  showMovies(req, res, next) {
    Movie.showMovies(req.db)
      .then(movies => {
        res
          .status(200)
          .json(movies)
      })
      .catch(next)
  },

  showOneMovie(req, res, next) {
    const { id } = req.params
    Movie.showOneMovie(req.db, id)
      .then(movie => {

        if (!movie) {
          next({type: 'notfound'})
        } else {
          res
            .status(200)
            .json(movie)
        }  
      })
      .catch(next)
  },

  addMovies(req, res, next) {
    Movie.addMovies(req.db, req.body)
      .then(movie => {
        const { insertedCount, ops } = movie
        res
          .status(200)
          .json({
            created: insertedCount,
            movie: ops[0]
          })
      })
      .catch(next)
  },

  updateMovies(req, res, next) {
    const { id } = req.params
    Movie.updateMovies(req.db, id, req.body)
      .then(({ result }) => {
        const { n, nModified } = result
        if (!n) {
          next({type: 'notfound'})
        } else if (n && !nModified) {
          next({type: 'notmodified'})
        } else {
          res
            .status(200)
            .json({
              found: n,
              modified: nModified
            })
        }
      })
      .catch(next)
  },

  deleteMovie(req, res, next) {
    const { id } = req.params
    Movie.deleteMovie(req.db, id)
      .then(results => {
        const { result, deletedCount } = results
        if (!result.n) {
          next({type: 'notfound'})
        } else if (!deletedCount) {
          next({type: 'notdeleted'})
        } else {
          res
            .status(200)
            .json({
              found: result.n,
              deleted: deletedCount
            })
        }
      })
      .catch(next)
  }
}