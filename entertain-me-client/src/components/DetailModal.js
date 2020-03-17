import React, { useState } from 'react';
import { Modal, Card, Row, Col }  from 'react-bootstrap'
import { IoIosCloseCircle } from "react-icons/io";
import { AiTwotoneEdit } from "react-icons/ai";
import EditModal from './EditModal'

const DetailModal = (props) => {
  const [editModalShow, setEditModalShow] = useState(false);
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Card>
          <Row>
            <Col sm="4">
              <Card.Img variant="top" src={props.item.poster_path} width="50px"/>
            </Col>
            <Col>
              <Card.Body>
                <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{props.item.title}</Card.Title>
                <Card.Text>{props.item.overview}</Card.Text>
                <Card.Text>Popularity : {props.item.popularity}</Card.Text>
                <Card.Text>Tags : {props.item.tags}</Card.Text>
              </Card.Body>
            </Col>
          </Row>
          <IoIosCloseCircle style={
            { 
              position: 'absolute',
              top: '.3rem',
              right: '.5rem',
              fontSize: '1.7rem',
              color: 'red',
              cursor: 'pointer'
              }
            }
            onClick={props.onHide}
          />
          <AiTwotoneEdit style={
            { 
              position: 'absolute',
              top: '.3rem',
              right: '2.5rem',
              fontSize: '1.7rem',
              color: 'blue',
              cursor: 'pointer'
              }
            }
            onClick={() => setEditModalShow(true)}
          />
        </Card>
      </Modal.Body>
      <EditModal
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        item={props.item}
        itemType={props.itemType}
      />
    </Modal>
  );
}

export default DetailModal;
