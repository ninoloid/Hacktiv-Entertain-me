const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

module.exports = {
  getAllData(req, res) {
    redis.get('services')
    .then(result => {
      if (result) {
        const response = JSON.parse(result)
        res
          .status(200)
          .json(response)
      } else {
        const getMovies = axios({
          method: 'get',
          url: process.env.MOVIESERVER
        })
      
        const getSeries = axios({
          method: 'get',
          url: process.env.TVSERVER
        })
      
        Promise.all([getMovies, getSeries])
          .then(results => {
            const movies = results[0].data
            const tvSeries = results[1].data
            const result = {
              movies,
              tvSeries
            }
              redis.set('services', JSON.stringify(result))
              res
                .status(200)
                .json(result)
          })
          .catch(console.log)
      }
    })
  }
}