import React, { useState, useEffect } from 'react';
import {Table, Row, Col, Button, Modal} from 'react-bootstrap';

import AreYouSure from './Modals/AreYouSure';

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
  const [activeTees, setActiveTees] = useState('White Tees');
  const [show, setShow] = useState(false);
  const [confirmModal, setConfirmModal] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleTeesToggle = () => {
    if (activeTees === 'White Tees') {
      setActiveTees('Red Tees');
    } else if (activeTees === 'Red Tees') {
      setActiveTees('Black Tees');
    } else {
      setActiveTees('White Tees');
    }
  };

  const confirmationModal = (confirm) => {
    setConfirmModal(confirm)
    handleShow();
  }
  
  const addPlayer = (name) => {
    const newPlayer = {
      ...player,
      name: name
    };
    setScorecard((prevScorecard) => [...prevScorecard, newPlayer]);
  };

  const deleteLastPlayer = () => {
    handleClose(); // Close the modal first
    setScorecard((prevScorecard) => {
      const updatedScorecard = [...prevScorecard];
      updatedScorecard.pop(); // Remove the last player from the array
      return updatedScorecard;
    });
  };
  

  console.log('scorecard', scorecard)

  return (
    <>
      <div className="mt-3 ms-1 me-1 text-center" style={{backgroundColor: "white"}}>
        <h2>{course.courseName}</h2>
        <Table striped="columns" bordered hover responsive>
          <thead>
            <tr>
              <th>Hole</th>
              {JSON.parse(course.pars).map((_, index) => (
                <th key={index + 1}>{index + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          <tr>
              <th className="tees-toggle" onClick={handleTeesToggle}>
                {activeTees} <span className="triangle"></span>
              </th>
              {/* Render tees based on the activeTees value */}
              {activeTees === 'White Tees' ? (
                JSON.parse(course.whiteTees).map((el) => (
                  <th key={el}>{el}</th>
                ))
              ) : (
                JSON.parse(course.redTees).map((el) => (
                  <th key={el}>{el}</th>
                ))
              )}
            </tr>
            <tr>
              <th>Par</th>
              {JSON.parse(course.pars).map((el, index) => (
                <th key={index + 1}>{el}</th>
              ))}
            </tr>
              {/* player data */}
              {scorecard.map((player, index) => (
                <tr key={index}>
                  <th>{player.name}</th>
                  {/* Render blank cells */}
                  {Array.from({ length: JSON.parse(course.pars).length }, (_, i) => (
                    <td key={i}></td>
                  ))}
                </tr>
              ))}
            <tr>
            <td colSpan={JSON.parse(course.pars).length + 1}>
              <div className="d-flex justify-content-start mt-2 mb-2 ms-1">
                <Button size="sm" style={{ color: "white", backgroundColor: "#AA9B56", border: "none" }} onClick={() => confirmationModal('add player')}>
                  + Add Player
                </Button>
                <Button className="ms-4" size="sm" style={{ color: "white", backgroundColor: "#AA5656", border: "none" }} onClick={() => confirmationModal('delete player')}>
                  - Delete Player
                </Button>
                  <AreYouSure show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow} confirmModal={confirmModal} addPlayer={addPlayer} deleteLastPlayer={deleteLastPlayer}/>
              </div>
            </td>
          </tr>
          </tbody>
        </Table>
      </div>
      <div className='d-flex flex-column justify-content-center m-5'>
        <Button size="lg" style={{ color:"white", backgroundColor: "#395144", border: "none"}}>
          Save Game
        </Button>
        <Button className="m-3" size="sm" style={{ color:"white", backgroundColor: "#4E6C50", border: "none"}}>
          New Game
        </Button>
      </div>
    </>
  )
}

export default Scorecard;