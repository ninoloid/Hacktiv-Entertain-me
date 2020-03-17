import React from 'react';
import { Modal }  from 'react-bootstrap'
import EditForm from './EditForm'

const DetailModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <EditForm item={props.item} onHide={props.onHide} itemType={props.itemType} />
    </Modal>
  );
}

export default DetailModal;
