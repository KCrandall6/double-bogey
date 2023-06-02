// are you sure you want to {add player, delete player, start new game without saving?}
// new game sets existingGame to false and erase localstorage

import React, { useState } from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import SaveGameModal from './SaveGameModal';

const AreYouSure = ({show, handleClose, confirmModal, addPlayer, deleteLastPlayer, restartNewGame, scorecard}) => {

  const [playerName, setPlayerName] = useState('');

  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  const newPlayer = (playerName) => {
    addPlayer(playerName);
    handleClose();
    setPlayerName('');
  };

  if (confirmModal === 'add player') {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a Player</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Player Name</Form.Label>
                <Form.Control placeholder="name" value={playerName} onChange={handlePlayerNameChange}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button size="lg" variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button size="lg" style={{ color:"white", backgroundColor: "#395144", border: "none"}} onClick={() => newPlayer(playerName)}>
              Add Player
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else if (confirmModal === 'delete player') {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete a Player</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete a player?
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button size="lg" variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button size="lg" style={{ color:"white", backgroundColor: "#AA5656", border: "none"}} onClick={() => deleteLastPlayer()}>
              Delete Player
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else if (confirmModal === 'new game') {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Start a New Game</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            Are you sure you want start a new game without saving?
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button size="lg" variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button size="lg" style={{ color:"white", backgroundColor: "#4E6C50", border: "none"}} onClick={() => restartNewGame()}>
              Start a New Game
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else if (confirmModal === 'save game') {
    return (
      <>
        <SaveGameModal show={show} handleClose={handleClose} scorecard={scorecard} restartNewGame={restartNewGame} />
      </>
    );
  }
}

export default AreYouSure;