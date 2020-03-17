import React from 'react';
import '../assets/styles/style.css'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HomeCard = ({imgUrl, cardTitle, linkTo}) => {
  return (
    <Card className="homeCard">
      <div className="imageRatio">
        <Card.Img className="img" variant="top" src={imgUrl} />
      </div>
      <Card.Body className="homeCardBody">
        <Card.Title>{cardTitle}</Card.Title>
        <Link to={linkTo}>
          <Button variant="outline-success">Show More</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default HomeCard;
