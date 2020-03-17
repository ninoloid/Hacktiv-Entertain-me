import { gql } from 'apollo-boost';

export const MOVIES = gql`
  {
    getMovies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const SERIES = gql`
  {
    getSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const ADD_MOVIE = gql`
  mutation ($movie: CreateMovieInput) {
    createMovie(movie: $movie) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const ADD_SERIES = gql`
  mutation ($series: CreateSeriesInput) {
    createSeries(series: $series){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const DELETE_MOVIE = gql`
  mutation ($id: ID) {
    deleteMovie (id: $id) {
      found
      deleted
    }
  }
`

export const DELETE_SERIES = gql`
  mutation ($id: ID) {
    deleteSeries (id: $id) {
      found
      deleted
    }
  }
`

export const EDIT_MOVIE = gql`
  mutation ($movie:UpdateMovieInput) {
    updateMovie(movie:$movie){
      found
      modified
    }
  }
`

export const EDIT_SERIES = gql`
  mutation ($series:UpdateSeriesInput) {
    updateSeries(series:$series){
      found
      modified
    }
  }
`