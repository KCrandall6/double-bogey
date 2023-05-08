import React, { useState, useEffect } from 'react';
import {Table, Row, Col, Button, Modal} from 'react-bootstrap';

const Scorecard = ({course, setCourse, scorecard, setScorecard}) => {

  const today = useState(new Date(new Date().setHours(0, 0, 0)));
  const [player, setPlayer] = useState({
    date: today,
    course: '',
    name: '',
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null,
    12: null,
    13: null,
    14: null,
    15: null,
    16: null,
    17: null,
    18: null
  });
  

  return (
    <div>
      <h1>Scorecard</h1>
    </div>
  )
}

export default Scorecard;