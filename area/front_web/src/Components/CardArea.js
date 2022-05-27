import React from 'react'
import { Card, Button } from 'react-bootstrap'
// import ModalAction from './ModalAtion';

// function CardArea(getAction) {

//     // const { onRemove } = props

//   return (
//     <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center',  paddingTop: '10px', paddingBottom: '10px' }}>
//         <Card style={{ width: '700px'}}>
//             <Card.Header>Action / Reaction</Card.Header>
//             <Card.Body>
//                 {/* <Card.Title>Special title treatment</Card.Title> */}
//                 <Card.Text>
//                     <Row>
//                         {getAction}
//                         {/* <Col> Action: {props.action}</Col> */}
//                         {/* <Col>Reaction: {props.reaction}</Col> */}
//                     </Row>
//                 </Card.Text>
//                 {/* <Button variant="danger" onClick={() => onRemove()}>Delete</Button> */}
//             </Card.Body>
//         </Card>
//     </div>
//   );
// }

// export default CardArea;

const CardArea = ({ getAction, delAction }) => (

    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center',  paddingTop: '10px', paddingBottom: '10px' }}>
    <Card style={{ width: '700px'}}>
             <Card.Header>Action / Reaction</Card.Header>
             <Card.Body>
                 {/* <Card.Title>Special title treatment</Card.Title> */}
                 <Card.Text>
                         {getAction}
                 </Card.Text>
                 <Button style={{ marginTop: '20px'}} variant="danger" onClick={delAction}>Delete</Button>
             </Card.Body>
         </Card>
    </div>
  );
  export default CardArea;