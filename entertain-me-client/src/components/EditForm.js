import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap'
import { useMutation } from '@apollo/react-hooks'
import { EDIT_MOVIE, MOVIES, EDIT_SERIES, SERIES } from './Query'

const EditForm = ({item, onHide, itemType}) => {
  const [title, setTitle] = useState(item.title)
  const [overview, setOverview] = useState(item.overview)
  const [posterPath, setPosterPath] = useState(item.poster_path)
  const [popularity, setPopularity] = useState(item.popularity)
  const [tags, setTags] = useState('')

  const handleTextChange = (value, type) => {
    type === "title" ? setTitle(value) :
    type === "overview" ? setOverview(value) :
    type === "poster" ? setPosterPath(value) :
    type === "popularity" ? setPopularity(value) :
    setTags(value)
  }
  
  const [updateMovie] = useMutation(EDIT_MOVIE, {
    update(cache) {
      const { getMovies } = cache.readQuery({ query: MOVIES })
      getMovies.forEach(movie => {
        if (movie._id === item._id) {
          movie.title = title
          movie.overview = overview
          movie.poster_path = posterPath
          movie.popularity = parseFloat(popularity)
          movie.tags = tags
        }
      })
      
      cache.writeQuery({
        query: MOVIES,
        data: { getMovies }
      })
    }
  })

  const [updateSeries] = useMutation(EDIT_SERIES, {
    update(cache) {
      const { getSeries } = cache.readQuery({ query: SERIES })
      getSeries.forEach(series => {
        if (series._id === item._id) {
          series.title = title
          series.overview = overview
          series.poster_path = posterPath
          series.popularity = parseFloat(popularity)
          series.tags = tags
        }
      })
      
      cache.writeQuery({
        query: SERIES,
        data: { getSeries }
      })
    }
  })

  const handleOnSubmit = (event) => {
    event.preventDefault()

    const payload = {
      _id: item._id,
      title,
      overview,
      poster_path: posterPath,
      popularity: parseFloat(popularity),
      tags
    }

    // updateMovie({ variables: { movie: payload }})
    if (itemType === 'movie') {
      updateMovie({ variables: { movie: payload }})
    } else if (itemType === 'series') {
      updateSeries({ variables: { series: payload }})
    }

    setTitle('')
    setOverview('')
    setPosterPath('')
    setPopularity('')
    setTags('')
  }

  const closeModal = event => {
    event.preventDefault()
    onHide()
  }

  return (
    <div style={{ background: 'whitesmoke', padding: '1rem', borderRadius: '1rem' }}>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={event => handleTextChange(event.target.value, "title")}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Overview</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Overview"
            value={overview}
            onChange={event => handleTextChange(event.target.value, "overview")}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Cover Image URL"
            value={posterPath}
            onChange={event => handleTextChange(event.target.value, "poster")}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Popularity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Popularity"
            min="0" max="10" step="0.1"
            value={popularity}
            onChange={event => handleTextChange(event.target.value, "popularity")}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tags</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tags, separated by spaces"
            value={tags}
            onChange={event => handleTextChange(event.target.value, "tags")}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ width: '75px', position: 'absolute', right: '85px' }}>SAVE</Button>
        <Button variant="danger" style={{ width: '75px', position: 'absolute', right: 0 }} onClick={event => closeModal(event)}>CLOSE</Button>
      </Form>
    </div>
  );
}

export default EditForm;
