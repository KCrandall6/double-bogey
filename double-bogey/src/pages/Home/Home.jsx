import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Scorecard from './Scorecard';
import { endpoint } from '../../configEndpoint';

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
    try {
      const storedScorecard = localStorage.getItem('scorecard');
      const storedCourse = localStorage.getItem('course');
      if (storedScorecard) {
        const parsedScorecard = JSON.parse(storedScorecard);
        const parsedCourse = JSON.parse(storedCourse)
        setScorecard(parsedScorecard);
        setCourse(parsedCourse);
        setExistingGame(true);
      }
    } catch (error) {
      console.error('Error parsing scorecard data:', error);
    }
  }, []);


  const startNewGame = async (selectedCourse) => {
    await fetch(`${endpoint}/.netlify/functions/getCourseInfo?course=${selectedCourse}`)
      .then((res) => res.json())
      .then((res) => {
        const parsedCourse = {
          ...res[0],
          pars: JSON.parse(res[0].pars),
          blackTees: JSON.parse(res[0].blackTees),
          whiteTees: JSON.parse(res[0].whiteTees),
          redTees: JSON.parse(res[0].redTees),
        };
        setCourse(parsedCourse);
        localStorage.setItem('course', JSON.stringify(parsedCourse));
        setScorecard([]); 
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
          <Scorecard course={course} scorecard={scorecard} setScorecard={setScorecard} setExistingGame={setExistingGame}/>
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
              <option value="Painted Mountain">Painted Mountain</option>
              <option value="Apache Wells">Apache Wells</option>
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