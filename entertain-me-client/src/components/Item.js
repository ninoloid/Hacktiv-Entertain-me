import React, { useState } from 'react';
import { Card } from 'react-bootstrap'
import '../assets/styles/style.css'
import { AiTwotoneDelete } from "react-icons/ai";
import { TiThList } from "react-icons/ti";
import { useMutation } from '@apollo/react-hooks'
import { DELETE_MOVIE, MOVIES, DELETE_SERIES, SERIES } from './Query'
import DetailModal from './DetailModal'

const Item = ({item, itemType}) => {
  const [modalShow, setModalShow] = useState(false);

  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    update(cache) {
      const { getMovies } = cache.readQuery({ query: MOVIES })
      cache.writeQuery({
        query: MOVIES,
        data: { getMovies: getMovies.filter(movie => movie._id !== item._id) }
      })
    }
  })

  const [deleteSeries] = useMutation(DELETE_SERIES, {
    update(cache) {
      const { getSeries } = cache.readQuery({ query: SERIES })
      cache.writeQuery({
        query: SERIES,
        data: { getSeries: getSeries.filter(series => series._id !== item._id) }
      })
    }
  })

  const deleteItem = () => {
    if (itemType === 'movie') {
      deleteMovie({ variables: { id: item._id }})
    } else if (itemType === 'series') {
      deleteSeries({ variables: { id: item._id }})
    }
  }

  return (
    <Card className="homeCard">
      <div className="imageRatio">
        <Card.Img className="img" variant="top" src={item.poster_path} />
      </div>
      <Card.Body className="homeCardBody itemCardBody">
        <Card.Text>{item.title}</Card.Text>
        <Card.Text>Popularity: {item.popularity}</Card.Text>
      </Card.Body>
      <AiTwotoneDelete
        className="menuIcon"
        onClick={deleteItem}
      />
      <TiThList
        className="menuIcon deleteIcon"
        onClick={() => setModalShow(true)}
      />

      <DetailModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        item={item}
        itemType={itemType}
      />
    </Card>
  );
}

export default Item;
