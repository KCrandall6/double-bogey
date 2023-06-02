import React, {useState, useEffect} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import { endpoint } from '../../../configEndpoint';

const NewScorecard = ({show, handleClose, course, setCourse, startNewGame}) => {

  const [courseOptions, setCourseOptions] = useState([]);

  useEffect(() => {
    fetch(`${endpoint}/.netlify/functions/getCourseNames`)
    .then((res) => res.json())
    .then((res) => setCourseOptions(res));
  }, []);

  return (
    <>
      <Modal className="mt-5" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Scorecard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="text-center">
              <p className="m-3"><em>To create a new scorecard, select a course from the menu</em></p>
            <Form.Select value={course.courseName} onChange={(e) => setCourse({ ...course, courseName: e.target.value })}>
              <option disabled value="">select a course</option>
              {courseOptions.length > 0 && (
                courseOptions.map((name, index) => (
                  <option key={index + 1} value={name.courseName}>{name.courseName}</option>
                ))
              )}
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
    </>
  )
};

export default NewScorecard;