// are you sure you want to {add player, delete player, start new game without saving?}
// new game sets existingGame to false and erase localstorage

import React, { useState } from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import {endpoint} from '../../../configEndpoint';

const AreYouSure = ({show, setShow, handleClose, handleShow, confirmModal, addPlayer, deleteLastPlayer, restartNewGame, scorecard}) => {

  const [playerName, setPlayerName] = useState('');
  const [password, setPassword] = useState('');

  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  const newPlayer = (playerName) => {
    addPlayer(playerName);
    handleClose();
    setPlayerName('');
  };

  const saveGame = async () => {
    const correctPassword = process.env.REACT_APP_SAVE_PW;
    if (password === correctPassword) {
      try {
        await Promise.all(
          scorecard.map(async (player) => {
            // Post player to the database
            const response = await fetch(`${endpoint}/.netlify/functions/addNewGame`, {
              method: 'POST',
              body: JSON.stringify(player),
              headers: {
                'Content-Type': 'application/json',
              },
            });
  
            if (!response.ok) {
              throw new Error('Failed to save player: ' + player.name);
            }
          })
        );
  
        restartNewGame();
      } catch (error) {
        console.log('Error saving game:', error);
      }
    } else {
      console.log('Incorrect password');
    }
  };
  
  
  console.log('scorecard in modal', scorecard)

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
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Save Game</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            Are you ready to save your game?
            <Form>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Please enter the Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button size="lg" variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button size="lg" style={{ color:"white", backgroundColor: "#4E6C50", border: "none"}} onClick={() => saveGame()}>
              Save Game
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default AreYouSure;