import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap'
import { MOVIES, ADD_MOVIE, SERIES, ADD_SERIES } from './Query'
import { useMutation } from '@apollo/react-hooks'

const AddForm = ({ formType }) => {
  const [title, setTitle] = useState('')
  const [overview, setOverview] = useState('')
  const [posterPath, setPosterPath] = useState('')
  const [popularity, setPopularity] = useState('')
  const [tags, setTags] = useState('')
  
  const [createMovie] = useMutation(ADD_MOVIE, {
    update(cache, { data: { createMovie } }) {
      const { getMovies } = cache.readQuery({ query: MOVIES })
      cache.writeQuery({
        query: MOVIES,
        data: { getMovies: getMovies.concat([createMovie]) }
      })
    }
  })

  const [createSeries] = useMutation(ADD_SERIES, {
    update(cache, { data: { createSeries } }) {
      const { getSeries } = cache.readQuery({ query: SERIES })
      cache.writeQuery({
        query: SERIES,
        data: { getSeries: getSeries.concat([createSeries]) }
      })
    }
  })

  const handleTextChange = (value, type) => {
    type === "title" ? setTitle(value) :
    type === "overview" ? setOverview(value) :
    type === "poster" ? setPosterPath(value) :
    type === "popularity" ? setPopularity(value) :
    setTags(value)
  }
  
  const handleOnSubmit = (event) => {
    event.preventDefault()
    const payload = {
      title,
      overview,
      poster_path: posterPath,
      popularity: parseFloat(popularity),
      tags
    }
    if (formType === 'addmovie') {
      createMovie({ variables: { movie: payload }})
    } else if (formType === 'addseries') {
      createSeries({ variables: { series: payload }})
    }

    setTitle('')
    setOverview('')
    setPosterPath('')
    setPopularity('')
    setTags('')
  }

  return (
    <div style={{ background: 'rgba(0,0,0,.3)', padding: '1rem' }}>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group>
          <h4 style={{ fontWeight: 'bold' }}>
            { formType ==='addmovie' ? "Add Movie" : formType === 'addseries' ? "Add Series" : ''}
          </h4>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={event => handleTextChange(event.target.value, "title")}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Overview"
            value={overview}
            onChange={event => handleTextChange(event.target.value, "overview")}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Cover Image URL"
            value={posterPath}
            onChange={event => handleTextChange(event.target.value, "poster")}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="number"
            placeholder="Popularity"
            min="0" max="10" step="0.1"
            value={popularity}
            onChange={event => handleTextChange(event.target.value, "popularity")}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Tags, separated by spaces"
            value={tags}
            onChange={event => handleTextChange(event.target.value, "tags")}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ width: '200px' }}>Add</Button>
      </Form>
    </div>
  );
}

export default AddForm;
