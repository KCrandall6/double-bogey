import React from 'react';
import { Row } from 'react-bootstrap';

const VBIndividual = ({person}) => {

  return (
    <div>
      <Row>{person.player}</Row>
    </div>
  )
};

export default VBIndividual;