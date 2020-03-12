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
      .then(({data: movies}) => {
        const result = {
          movies
        }
          redis.set('movieCache', JSON.stringify(result))
          res
            .status(200)
            .json(result)
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
      .then(({data: series}) => {
        const result = {
          series
        }
          redis.set('seriesCache', JSON.stringify(result))
          res
            .status(200)
            .json(result)
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
        redis.get('movieCache')
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
        redis.get('seriesCache')
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
}