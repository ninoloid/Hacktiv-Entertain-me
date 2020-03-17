const Series = require('../models/Series')

module.exports = {
  showAllSeries(req, res, next) {
    Series.showAllSeries(req.db)
      .then(series => {
        res
          .status(200)
          .json(series)
      })
      .catch(next)
  },

  showOneSeries(req, res, next) {
    const { id } = req.params
    Series.showOneSeries(req.db, id)
      .then(series => {

        if (!series) {
          next({type: 'notfound'})
        } else {
          res
            .status(200)
            .json(series)
        }  
      })
      .catch(next)
  },

  addSeries(req, res, next) {
    Series.addSeries(req.db, req.body)
      .then(series => {
        const { insertedCount, ops } = series
        res
          .status(200)
          .json({
            created: insertedCount,
            series: ops[0]
          })
      })
      .catch(next)
  },

  updateSeries(req, res, next) {
    const { id } = req.params
    Series.updateSeries(req.db, id, req.body)
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

  deleteSeries(req, res, next) {
    const { id } = req.params
    Series.deleteSeries(req.db, id)
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