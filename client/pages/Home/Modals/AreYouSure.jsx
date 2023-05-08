// are you sure you want to {add player, delete player, start new game without saving?}
// new game sets existingGame to false and erase localstorage

import React, { useState } from 'react';
import {Button, Modal, Form} from 'react-bootstrap';

const AreYouSure = ({show, setShow, handleClose, handleShow, confirmModal, addPlayer, deleteLastPlayer}) => {

  const [playerName, setPlayerName] = useState('');

  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  const newPlayer = (playerName) => {
    addPlayer(playerName);
    handleClose();
    setPlayerName('');
  }

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
  }
  
}

export default AreYouSure;