import React from 'react';
import { Row, Col } from 'react-bootstrap'
import '../assets/styles/style.css'
import { Link } from 'react-router-dom'
import { GoHome } from "react-icons/go";

const ContentHeader = ({ contentSection }) => {
  return (
      <Row style={{ background: 'rgba(0,0,0,.7)', margin: 0, marginBottom: '1rem', height: '60px' }}>
        <Col md="11" style={{ padding: '.65rem', fontSize: '1.5rem', color: 'white', fontWeight: 'bold' }}>
          <span style={{ position: 'absolute', left: '1rem' }}>{ contentSection }</span>
        </Col>
        <Col md="1">
          <Link to="/">
            <div
              className="linkToHome"
              style={
              { 
                width: "100%",
                height: "100%",
                padding: '.65rem 0',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1.5rem',
                position: 'absolute',
                right: 0
              }
            }>
              <GoHome />
            </div>
          </Link>
        </Col>
      </Row>
  );
}

export default ContentHeader;
