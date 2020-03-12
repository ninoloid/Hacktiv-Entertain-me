const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

const getData = (res, cache, server) => {
  redis.get(cache)
    .then(result => {
      if (result) {
        const response = JSON.parse(result)
        res
          .status(200)
          .json(response)
      } else {
        return axios({
          method: 'get',
          url: server
        })
      }
    })
    .then(response => {
      if (response) {
        const lists = response.data
        redis.set(cache, JSON.stringify(lists))
        res
          .status(200)
          .json(lists)
      }
    })
    .catch(({response}) => {
      res
        .status(response.status)
        .json(response.data)
    })
}

const addData = (res, payload, server, cache) => {
  axios({
    method: 'post',
    url: server,
    data: payload
  })
    .then(({data}) => {
      redis.del('services')
      redis.del(cache)
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

const deleteItem = (res, id, server, cache) => {
  axios({
    method: 'delete',
    url: `${server}/${id}`
  })
    .then(({data}) => {
      redis.del('services')
      redis.del(cache)
      res
        .status(200)
        .json(data)
    })
    .catch(({response}) => {
      res
        .status(response.status)
        .json(response.data)
    })
}

const getOneItem = (res, id, cache, server) => {
  redis.get(cache)
    .then(result => {
      if (result) {
        const items = JSON.parse(result)
        const item = items.filter(oneItem => oneItem._id === id)
        if (item.length > 0) {
          res
            .status(200)
            .json(item[0])
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
          url: `${server}/${id}`
        })
      }
    })
    .then(response => {
      if (response) {
        const items = response.data
        res
          .status(200)
          .json(items)
      }
    })
    .catch(({response}) => {
      res
        .status(response.status)
        .json(response.data)
    })
}

const editItem = (res, id, payload, server, cache) => {
  axios({
    method: 'patch',
    url: `${server}/${id}`,
    data: payload
  })
    .then(({data}) => {
      redis.del('services')
      redis.del(cache)
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

module.exports = {
  getMovies(req, res) {
    const cache = 'movieCache'
    getData(res, cache, process.env.MOVIESERVER)
  },

  getSeries(req, res) {
    const cache = 'seriesCache'
    getData(res, cache, process.env.TVSERVER)
  },

  addMovies(req, res) {
    const data = req.body
    const cache = 'movieCache'
    addData(res, data, process.env.MOVIESERVER, cache)
  },

  addSeries(req, res) {
    const data = req.body
    const cache = 'seriesCache'
    addData(res, data, process.env.TVSERVER, cache)
  },
  
  deleteMovies(req, res) {
    const { id } = req.params
    const cache = 'movieCache'
    deleteItem(res, id, process.env.MOVIESERVER, cache)
  },

  deleteSeries(req, res) {
    const { id } = req.params
    const cache = 'seriesCache'
    deleteItem(res, id, process.env.TVSERVER, cache)
  },

  getOneMovie(req, res) {
    const { id } = req.params
    const cache = 'movieCache'
    getOneItem(res, id, cache, process.env.MOVIESERVER)
  },

  getOneSeries(req, res) {
    const { id } = req.params
    const cache = 'seriesCache'
    getOneItem(res, id, cache, process.env.TVSERVER)
  },

  editMovie(req, res) {
    const { id } = req.params
    const data = req.body
    const cache = 'movieCache'
    editItem(res, id, data, process.env.MOVIESERVER, cache)
  },

  editSeries(req, res) {
    const { id } = req.params
    const data = req.body
    const cache = 'seriesCache'
    editItem(res, id, data, process.env.TVSERVER, cache)
  },

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
  }
}