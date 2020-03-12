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
          
          return Promise.all([getMovies, getSeries])
        }
      })    
      .then(results => {
        if (results) {
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
        }
      })
      .catch(({response}) => {
        res
          .status(response.status)
          .json(response.data)
      })
  },

  getMovies(req, res) {
    redis.get('movieCache')
      .then(result => {
        if (result) {
          const response = JSON.parse(result)
          res
            .status(200)
            .json(response)
        } else {
          return axios({
            method: 'get',
            url: process.env.MOVIESERVER
          })
        }
      })
      .then(response => {
        if (response) {
          const movies = response.data
          redis.set('movieCache', JSON.stringify(movies))
          res
            .status(200)
            .json(movies)
        }
      })
      .catch(({response}) => {
        res
          .status(response.status)
          .json(response.data)
      })
  },

  getSeries(req, res) {
    redis.get('seriesCache')
      .then(result => {
        if (result) {
          const response = JSON.parse(result)
          res
            .status(200)
            .json(response)
        } else {
          return axios({
            method: 'get',
            url: process.env.TVSERVER
          })
        }
      })
      .then(response => {
        if (response) {
          const series = response.data
          redis.set('seriesCache', JSON.stringify(series))
          res
            .status(200)
            .json(series)
        }
      })
      .catch(({response}) => {
        res
          .status(response.status)
          .json(response.data)
      })
  },

  addMovies(req, res) {
    const data = req.body
    axios({
      method: 'post',
      url: process.env.MOVIESERVER,
      data
    })
      .then(({data}) => {
        redis.del('services')
        res
          .status(201)
          .json(data)
      })
      .catch(({response}) => {
        res
          .status(response.status)
          .json(response.data)
      })
  },

  addSeries(req, res) {
    const data = req.body
    axios({
      method: 'post',
      url: process.env.TVSERVER,
      data
    })
      .then(({data}) => {
        redis.del('services')
        res
          .status(201)
          .json(data)
      })
      .catch(({response}) => {
        res
          .status(response.status)
          .json(response.data)
      })
  },

  deleteMovies(req, res) {
    const data = req.body
    const { id } = req.params
    axios({
      method: 'delete',
      url: `${process.env.MOVIESERVER}/${id}` ,
      data
    })
      .then(({data}) => {
        redis.del('services')
        redis.del('movieCache')
        res
          .status(200)
          .json(data)
      })
      .catch(({response}) => {
        res
          .status(response.status)
          .json(response.data)
      })
  },

  deleteSeries(req, res) {
    const data = req.body
    const { id } = req.params
    axios({
      method: 'delete',
      url: `${process.env.TVSERVER}/${id}` ,
      data
    })
      .then(({data}) => {
        redis.del('services')
        redis.del('seriesCache')
        res
          .status(200)
          .json(data)
      })
      .catch(({response}) => {
        res
          .status(response.status)
          .json(response.data)
      })
  },

  getOneMovie(req, res) {
    const { id } = req.params
    redis.get('movieCache')
      .then(result => {
        if (result) {
          const movies = JSON.parse(result)
          const movie = movies.filter(item => item._id === id)
          if (movie.length > 0) {
            res
              .status(200)
              .json(movie[0])
          } else {
            res
              .status(404)
              .json({
                errObj: {msg: "Item not found in the database"}
              })
          }
        } else {
          return axios({
            method: 'get',
            url: `${process.env.MOVIESERVER}/${id}`
          })
        }
      })
      .then(response => {
        if (response) {
          const movies = response.data
          res
            .status(200)
            .json(movies)
        }
      })
      .catch(({response}) => {
        res
          .status(response.status)
          .json(response.data)
      })
  },

  getOneSeries(req, res) {
    const { id } = req.params
    redis.get('seriesCache')
      .then(result => {
        if (result) {
          const allSeries = JSON.parse(result)
          const series = allSeries.filter(item => item._id === id)
          if (series.length > 0) {
            res
              .status(200)
              .json(series[0])
          } else {
            res
              .status(404)
              .json({
                errObj: {msg: "Item not found in the database"}
              })
          }
        } else {
          return axios({
            method: 'get',
            url: `${process.env.TVSERVER}/${id}`
          })
        }
      })
      .then(response => {
        if (response) {
          const series = response.data
          res
            .status(200)
            .json(series)
        }
      })
      .catch(({response}) => {
        res
          .status(response.status)
          .json(response.data)
      })
  },

  editMovie(req, res) {
    const data = req.body
    const { id } = req.params
    axios({
      method: 'patch',
      url: `${process.env.MOVIESERVER}/${id}`,
      data
    })
      .then(({data}) => {
        redis.del('services')
        redis.del('movieCache')
        res
          .status(201)
          .json(data)
      })
      .catch(({response}) => {
        res
          .status(response.status)
          .json(response.data)
      })
  },

  editSeries(req, res) {
    const data = req.body
    const { id } = req.params
    axios({
      method: 'patch',
      url: `${process.env.TVSERVER}/${id}`,
      data
    })
      .then(({data}) => {
        redis.del('services')
        redis.del('seriesCache')
        res
          .status(201)
          .json(data)
      })
      .catch(({response}) => {
        res
          .status(response.status)
          .json(response.data)
      })
  }
}