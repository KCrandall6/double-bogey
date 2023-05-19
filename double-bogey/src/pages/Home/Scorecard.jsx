import React, { useState } from 'react';
import {Table, Button} from 'react-bootstrap';

import AreYouSure from './Modals/AreYouSure';

const Scorecard = ({course, scorecard, setScorecard, setExistingGame}) => {

  const today = useState(new Date(new Date().setHours(0, 0, 0)));
  const [activeTees, setActiveTees] = useState('White Tees');
  const [show, setShow] = useState(false);
  const [confirmModal, setConfirmModal] = useState('');

  const addPlayer = (name) => {
    const newPlayer = {
      date: today,
      course: course.courseName,
      name: name,
      scores : {
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
        18: null,
      },
      total: 0
    };
    setScorecard((prevScorecard) => [...prevScorecard, newPlayer]);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleTeesToggle = () => {
    const options = [];
    if (JSON.parse(course.blackTees).length > 0) {
      options.push('Black Tees');
    }
    if (JSON.parse(course.whiteTees).length > 0) {
      options.push('White Tees');
    }
    if (JSON.parse(course.redTees).length > 0) {
      options.push('Red Tees');
    }
    const currentIndex = options.findIndex((option) => option === activeTees);
    const nextIndex = (currentIndex + 1) % options.length;
    setActiveTees(options[nextIndex]);
  };

  const confirmationModal = (confirm) => {
    setConfirmModal(confirm)
    handleShow();
  }

  const deleteLastPlayer = () => {
    handleClose(); // Close the modal first
    setScorecard((prevScorecard) => {
      const updatedScorecard = [...prevScorecard];
      updatedScorecard.pop(); // Remove the last player from the array
      return updatedScorecard;
    });
  };

  const restartNewGame = () => {
    setScorecard([]);
    setExistingGame(false);
  };
  
  const scoreSum = (inputs) => {
    inputs = JSON.parse(inputs);
    return inputs.reduce((cur, acc) => cur + acc);
  };
  
  const handleInputChange = (playerIndex, holeIndex, value) => {
    setScorecard((prevScorecard) => {
      const updatedScorecard = [...prevScorecard];
      updatedScorecard[playerIndex].scores[holeIndex] = Number(value);
  
      // Calculate the total score for the current player
      const player = updatedScorecard[playerIndex];
      const scores = Object.values(player.scores);
      const total = scoreSum(JSON.stringify(scores));
      player.total = total;
  
      return updatedScorecard;
    });
  };
  
  
  

  console.log('score', scorecard)

  return (
    <>
      <div className="mt-3 ms-1 me-1 text-center" style={{backgroundColor: "white"}}>
        <h2 className='pt-2 course-name'>{course.courseName}</h2>
        <Table striped="columns" bordered hover responsive>
          <thead>
            <tr>
              <th>Hole</th>
              {JSON.parse(course.pars).map((_, index) => (
                <th key={index + 1}>{index + 1}</th>
              ))}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
          <tr>
          <th className="tees-toggle" onClick={handleTeesToggle}>
              {activeTees} <span className="triangle"></span>
            </th>
            {/* Render tees based on the activeTees value */}
            {activeTees === 'White Tees' && JSON.parse(course.whiteTees).length > 0 ? (
              JSON.parse(course.whiteTees).map((el, index) => (
                <th key={index + 1}>{el}</th>
              ))
            ) : activeTees === 'Red Tees' && JSON.parse(course.redTees).length > 0 ? (
              JSON.parse(course.redTees).map((el, index) => (
                <th key={index + 1}>{el}</th>
              ))
            ) : activeTees === 'Black Tees' && JSON.parse(course.blackTees).length > 0 ? (
              JSON.parse(course.blackTees).map((el, index) => (
                <th key={index + 1}>{el}</th>
              ))
            ) : null}
            </tr>
            <tr>
              <th>Par</th>
              {JSON.parse(course.pars).map((el, index) => (
                <th key={index + 1}>{el}</th>
              ))}
              <th>{scoreSum(course.pars)}</th>
            </tr>
              {/* player data */}
              {scorecard.map((player, index) => (
                <tr key={index}>
                  <th style={{fontSize: '25px'}}>{player.name}</th>
                  {/* Render editable cells */}
                  {Array.from({ length: JSON.parse(course.pars).length }, (_, i) => (
                    <td key={i}>
                      <input
                        type="number"
                        value={player.scores[i + 1] || ''}
                        onChange={(e) => handleInputChange(index, i + 1, e.target.value)}
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          backgroundColor: 'transparent',
                          border: 'none',
                          textAlign: 'center',
                          color: '#000',
                          fontSize: '25px',
                          padding: '0 5px',
                        }}
                      />
                    </td>
                  ))}
                  <th style={{fontSize: '25px'}}>{player.total}</th>
                </tr>
              ))}
            <tr>
            <td colSpan={JSON.parse(course.pars).length + 1}>
              <div className="d-flex justify-content-start mt-2 mb-2 ms-1">
                <Button size="sm" style={{ color: "white", backgroundColor: "#AA9B56", border: "none" }} onClick={() => confirmationModal('add player')}>
                  + Add Player
                </Button>
                <Button className="ms-4" size="sm" style={{ color: "white", backgroundColor: "#AA5656", border: "none" }} onClick={() => confirmationModal('delete player')} disabled={scorecard.length === 0}>
                  - Delete Player
                </Button>
                  <AreYouSure show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow} confirmModal={confirmModal} addPlayer={addPlayer} deleteLastPlayer={deleteLastPlayer} restartNewGame={restartNewGame} scorecard={scorecard}/>
              </div>
            </td>
          </tr>
          </tbody>
        </Table>
      </div>
      <div className='d-flex flex-column justify-content-center align-items-center m-5 pb-5'>
        <Button size="lg" style={{ color:"white", backgroundColor: "#395144", border: "none" ,minWidth:"250px", maxWidth: "500px"}} onClick={() => confirmationModal('save game')}>
          Save Game
        </Button>
        <Button className="m-3" size="sm" style={{ color:"white", backgroundColor: "#4E6C50", border: "none", minWidth:"200px", maxWidth: "500px"}} onClick={() => confirmationModal('new game')}>
          New Game
        </Button>
      </div>
    </>
  )
}

export default Scorecard;