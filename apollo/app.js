const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')
const Redis = require("ioredis")
const redis = new Redis()

const typeDefs = gql`

  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type MovieDeleteResult {
    found: Int
    deleted: Int
  }

  type SeriesDeleteResult {
    found: Int
    deleted: Int
  }

  type MovieUpdateResult {
    found: Int
    modified: Int
  }

  type SeriesUpdateResult {
    found: Int
    modified: Int
  }

  type Query {
    getMovies: [Movie]
    getSeries: [Series]
    getMovie(id: String): Movie
    getOneSeries(id: String): Series
  }

    
  input CreateMovieInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: String
  }

  input CreateSeriesInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: String
  }

  input UpdateMovieInput {
    _id: ID
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: String
  }

  input UpdateSeriesInput {
    _id: ID
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: String
  }

  type Mutation {
    createMovie(movie: CreateMovieInput): Movie
    createSeries(series: CreateSeriesInput): Series
    updateMovie(movie: UpdateMovieInput): MovieUpdateResult
    updateSeries(series: UpdateSeriesInput): SeriesUpdateResult
    deleteMovie(id: ID): MovieDeleteResult
    deleteSeries(id: ID): SeriesDeleteResult
  }
`

const fetchData = (port, type) => {
  const isExistOnCache = redis.hget('services', type)
  .then(result => {
    if (result) return JSON.parse(result)
    else {
      return (async () => {
        const { data } = await axios.get(`http://localhost:${port}/${type}`)
        return data
      })()
    }
  })
  .then(data => {
    redis.hset('services', type, JSON.stringify(data))
    return data
  })
  .catch(console.log)
  return isExistOnCache
}

const resolvers = {
  Query: {
    getMovies: () => {
      return fetchData(3001, 'movies')
    },

    getSeries: () => {
      return fetchData(3002, 'tv')
    },

    getMovie: (_, args) => {
      return fetchData(3001, `movies/${args.id}`)
    },

    getOneSeries: (_, args) => {
      return fetchData(3002, `tv/${args.id}`)
    },
  },

  Mutation: {
    createMovie: async (_, args) => {
      redis.del('services')
      const { data } = await axios.post(`http://localhost:3001/movies`, args.movie)
      return data.movie
    },

    createSeries: async (_, args) => {
      redis.del('services')
      const { data } = await axios.post(`http://localhost:3002/tv`, args.series)
      return data.series
    },

    updateMovie: async (_, args) => {
      redis.del('services')
      const { _id } = args.movie
      const { data } = await axios.patch(`http://localhost:3001/movies/${_id}`, args.movie)
      return data
    },

    updateSeries: async (_, args) => {
      redis.del('services')
      const { _id } = args.series
      const { data } = await axios.patch(`http://localhost:3001/movies/${_id}`, args.series)
      return data
    },

    deleteMovie: async (_, args) => {
      redis.del('services')
      const { id } = args
      const { data } = await axios.delete(`http://localhost:3001/movies/${id}`)
      return data
    },

    deleteSeries: async (_, args) => {
      redis.del('services')
      const { id } = args
      const { data } = await axios.delete(`http://localhost:3002/tv/${id}`)
      return data
    },
  }
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`); 
})