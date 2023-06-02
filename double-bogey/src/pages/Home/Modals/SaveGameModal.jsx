import React, {useState} from 'react';
import {Modal, Form, Button, Spinner} from 'react-bootstrap';
import {endpoint} from '../../../configEndpoint';

const SaveGameModal = ({ show, handleClose, scorecard, restartNewGame }) => {
  const [password, setPassword] = useState('');
  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);
  const [isSavingGame, setIsSavingGame] = useState(false);

  const saveGame = async () => {
    const correctPassword = process.env.REACT_APP_SAVE_PW;
    if (password === correctPassword) {
      try {
        setIsSavingGame(true);

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
        setIsSavingGame(false);
      } catch (error) {
        console.log('Error saving game:', error);
        setIsSavingGame(false);
      }
    } else {
      setIsPasswordIncorrect(true);
      console.log('Incorrect password');
    }
  };

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
                isInvalid={isPasswordIncorrect}
                disabled={isSavingGame}
              />
              {isPasswordIncorrect && (
                <Form.Text className="text-danger">
                  Incorrect password
                </Form.Text>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button size="lg" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            size="lg"
            style={{ color: 'white', backgroundColor: '#4E6C50', border: 'none' }}
            onClick={saveGame}
            disabled={isSavingGame}
          >
            {isSavingGame ? (
              <Spinner animation="border" size="sm" role="status" className="me-2">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              'Save Game'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SaveGameModal;