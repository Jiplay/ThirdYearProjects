/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import ModalAction from './ModalAtion';

function EventArea() {

    const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
        <div style={{ textAlign: 'center', justifyContent: 'center' }}>
              <Button style={{ marginTop: '50px', marginBottom: '20px' }} onClick={() => setModalShow(true)} >Add Action Reaction</Button>
            <ModalAction
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    </div>
  );
}

export default EventArea;