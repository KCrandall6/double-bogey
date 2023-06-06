import React, {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import { endpoint } from '../../configEndpoint';
import Profile from './Profile';

const MyProfile = () => {

  const [person, setPerson] = useState('');
  const [check, setCheck] = useState(false);
  const [playerGames, setPlayerGames] = useState([]);

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      setPerson(storedProfile);
      setCheck(true);
    }
  }, [])

  const handlePersonNameChange = (event) => {
    setPerson(event.target.value);
  };

  const searchForProfile = async (name) => {
    console.log('success', name)
    await fetch(`${endpoint}/.netlify/functions/searchName?name=${name}`)
    .then((res) => res.json())
    .then((res) => {
      setPlayerGames(res);
      setCheck(true);
    });
  }

  return (
    <>
      {check === true ? (
        <Profile playerGames={playerGames} setCheck={setCheck}/>
      ) : (
        <div className="mobile-container">
          <div className="d-flex flex-column m-2 text-center align-items-center">
            <h1>My Profile</h1>
            <Form className="mt-3 mb-3">
              <Form.Group>
                <Form.Label>Search for your profile</Form.Label>
                <Form.Control placeholder="name" value={person} onChange={handlePersonNameChange}/>
              </Form.Group>
            </Form>
            <Button style={{ color:"white", backgroundColor: "#395144", border: "none"}} onClick={() => searchForProfile(person)} >Search</Button>
          </div>
        </div>
      )}
    </>
  )
}

export default MyProfile;