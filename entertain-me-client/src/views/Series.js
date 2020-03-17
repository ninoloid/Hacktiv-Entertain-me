import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { SERIES } from '../components/Query'
import ItemContainer from '../components/ItemContainer'
import AddForm from '../components/AddForm'
import { Row, Col } from 'react-bootstrap'
import ContentHeader from '../components/ContentHeader'

const Series = () => {
  const { loading, error, data } = useQuery(SERIES)
  const Item = () => data.getSeries.map(item => <ItemContainer key={item._id} item={item} itemType="series"/>)

  if (loading) return <h1>Loading..</h1>
  if (error) return <h1>Error..</h1>
  
  return (
    <div className="px-5 py-3">
      <ContentHeader contentSection="Series" />
      <Row>
        <Col lg="8" md={{ span: 6, order: 1 }} xs={{ span: 12, order: 12 }}>
          <div style={{ background: 'rgba(0,0,0,.3)', padding: '1rem' }}>
            <Row>
              <Item />
            </Row>
          </div>
        </Col>
        <Col lg="4" md={{ span: 6, order: 12 }} xs={{ span: 12, order: 1 }}>
          <AddForm formType="addseries"/>
        </Col>
      </Row>
    </div>
  );
}

export default Series;
