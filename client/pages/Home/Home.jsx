import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Scorecard from './Scorecard';

const Home = () => {

  const [existingGame, setExistingGame] = useState(false);
  const [course, setCourse] = useState({
    courseName: '',
    pars: [],
    blackTees: [],
    whiteTees: [],
    redTees: []
  });
  const [scoreCard, setScoreCard] = useState([]);
  const [show, setShow] = useState(false);

  // check if a game is already in progress
  useEffect(() => {
    const currentCard = JSON.parse(localStorage.getItem('scoreCard'))
    if (currentCard.length > 0) {
      if (currentCard[0][1]) {
        setExistingGame(true);
      }
    }
  }, []);

  const startNewGame = (selectedCourse) => {
    localStorage.setItem('course', selectedCourse);
    localStorage.setItem('scoreCard', JSON.stringify(scoreCard));
    setExistingGame(true);
    handleClose();
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {existingGame ? (
        <div>
          <Scorecard course={course} setCourse={setCourse} scoreCard={scoreCard} setScoreCard={setScoreCard}/>
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
              <p className="m-3"><em>To create a new scorecard, select a course from the menu</em></p>
            <Form.Select value={course.courseName} onChange={(e) => setCourse({ ...course, courseName: e.target.value })}>
              <option disabled value="">select a course</option>
              <option value="Royal Palms">Royal Palms</option>
              <option value="Longbow">Longbow</option>
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button size="lg" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button size="lg" style={{ color:"white", backgroundColor: "#395144", border: "none"}} onClick={() => startNewGame(course.courseName)}>
            Create New Game
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
      )}
    </>
  )
}

export default Home;