import React from 'react';
import Item from './Item'
import { Col } from 'react-bootstrap'

const ItemContainer = ({item, itemType}) => {
  return (
    <Col lg="4" md="6" sm="6" className="mb-2">
      <Item item={item} itemType={itemType}/>
    </Col>
  );
}

export default ItemContainer;
