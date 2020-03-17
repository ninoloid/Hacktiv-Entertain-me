import React from 'react';
import '../assets/styles/style.css'
import { Jumbotron, Container } from 'react-bootstrap'

const MyJumbotron = () => {
  return (
    <Jumbotron fluid className="myJumbotron" style={{ marginBottom: "1rem" }}>
      <Container
        style={
          {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }
        }>
        <h1 style={{ fontSize: '5rem' }}>MOVIE DATABASE</h1>
      </Container>
    </Jumbotron>
  );
}

export default MyJumbotron;
