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

  type Query {
    getMovies: [Movie]
    getSeries: [Series]
    getMovie(id: String): Movie
    getOneSeries(id: String): Series
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
  }
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
})