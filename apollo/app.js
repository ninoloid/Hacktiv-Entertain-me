const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')

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
    updateMovie(movie: UpdateMovieInput): Movie
    updateSeries(series: UpdateSeriesInput): Series
    deleteMovie(id: ID): MovieDeleteResult
    deleteSeries(id: ID): SeriesDeleteResult
  }
`

const fetchData = async (port, type) => {
  const { data } = await axios.get(`http://localhost:${port}/${type}`)
  return data
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
      const { data } = await axios.post(`http://localhost:3001/movies`, args.movie)
      return data.movie
    },

    createSeries: async (_, args) => {
      console.log(args)
      const { data } = await axios.post(`http://localhost:3002/tv`, args.series)
      return data.series
    },

    updateMovie: async (_, args) => {
      const { _id } = args.movie
      const { data } = await axios.patch(`http://localhost:3001/movies/${_id}`, args.movie)
      return data.movie
    },

    updateSeries: async (_, args) => {
      const { _id } = args.series
      const { data } = await axios.patch(`http://localhost:3001/movies/${_id}`, args.series)
      return data.series
    },

    deleteMovie: async (_, args) => {
      const { id } = args
      const { data } = await axios.delete(`http://localhost:3001/movies/${id}`)
      console.log(data)
      return data
    },

    deleteSeries: async (_, args) => {
      console.log(args)
      const { id } = args
      const { data } = await axios.delete(`http://localhost:3002/tv/${id}`)
      console.log(data)
      return data
    },
  }
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`); 
})