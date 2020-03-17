import React from 'react';
import MyJumbotron from '../components/MyJumbotron'
import { Row, Col, Container } from 'react-bootstrap'
import HomeCard from '../components/HomeCard'
import '../assets/styles/style.css'

const Home = () => {
  return (
    <div>
      <MyJumbotron />
      <Container>
        <Row>
          <Col className="homeText" md="6" sm="12">
            <p>All in one<br />movie database.</p>
            <p>One place<br />to get all you want.</p>
          </Col>
          <Col md="6" sm="12">
            <Row>
              <Col className="py-2" md="6" sm="12">
                <HomeCard
                  imgUrl="https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
                  cardTitle="MOVIES"
                  linkTo="/movies"
                />
              </Col>
              <Col className="py-2" md="6" sm="12">
                <HomeCard
                  imgUrl="https://m.media-amazon.com/images/M/MV5BYmNiNzlhOWItMDM5Mi00MGYzLWI1ZDYtNmI5NzI0MWFkMTIwXkEyXkFqcGdeQXVyNjU2NjA5NjM@._V1_SX300.jpg"
                  cardTitle="TV SERIES"
                  linkTo="/series"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
