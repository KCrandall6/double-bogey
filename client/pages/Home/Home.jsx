import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const Home = () => {

  const [existingGame, setExistingGame] = useState(false);
  const [today, setToday] = useState(new Date(new Date().setHours(0, 0, 0)))
  const [course, setCourse] = useState({
    courseName: '',
    pars: [],
    blackTees: [],
    whiteTees: [],
    redTees: []
  })
  const [scoreCard, setScoreCard] = useState([{
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
  }])

  const startNewGame = () => {
    setExistingGame(true);
    handleClose();
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {existingGame ? (
        <div>
          <h1>There is a game</h1>
        </div>
      ) : (
        <div className='d-flex justify-content-center mt-5 pt-5'>
          <Button size="lg" onClick={handleShow} style={{ color:"white", backgroundColor: "#395144", border: "none"}}>
            New Game
          </Button>

          <Modal className="mt-5" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="text-center">
              <p className="m-3"><em>Select a course from the menu</em></p>
            <Form.Select defaultValue="">
              <option disabled value="">Select a Course</option>
              <option value="Royal Palms">Royal Palms</option>
              <option value="Longbow">Longbow</option>
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button size="lg" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button size="lg" style={{ color:"white", backgroundColor: "#395144", border: "none"}} onClick={() => startNewGame()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
      )}
    </>
  )
}

export default Home;