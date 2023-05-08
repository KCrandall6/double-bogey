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
  const [scorecard, setScorecard] = useState([]);
  const [show, setShow] = useState(false);

  // check if a game is already in progress
  useEffect(() => {
    const currentCard = JSON.parse(localStorage.getItem('scoreCard'))
    console.log('curcard', currentCard)
    if (currentCard.length) {
      if (currentCard[0][1]) {
        // STILL NEED to write logic to then update the scoreCard variable with the scores if it exists
        setExistingGame(true);
      }
    }
  }, []);

  const startNewGame = async (selectedCourse) => {
    await fetch(`http://localhost:3000/getCourseInfo?course=${selectedCourse}`)
      .then((res) => res.json())
      .then((res) => {
        setCourse(res[0]);
        //Come back to this; do I need to setItem in localStorage here, or is it unneccesary?
        localStorage.setItem('scoreCard', JSON.stringify(scorecard));
        setExistingGame(true);
        handleClose();
      });
  };  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {existingGame ? (
        <div>
          <Scorecard course={course} setCourse={setCourse} scorecard={scorecard} setScorecard={setScorecard} setExistingGame={setExistingGame}/>
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