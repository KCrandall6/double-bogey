import React, {useState, useEffect} from 'react';
import {Form, Button, Spinner} from 'react-bootstrap';
import { endpoint } from '../../configEndpoint';
import Profile from './Profile';

const MyProfile = () => {

  const [person, setPerson] = useState('');
  const [check, setCheck] = useState(false);
  const [isPersonInvalid, setIsPersonInvalid] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [soloGames, setSoloGames] = useState([]);
  const [teamGames, setTeamGames] = useState([]);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('profile'));
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setSoloGames(storedProfile.solo);
      setTeamGames(storedProfile.team);
      setPerson(storedName);
      setCheck(true);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      'profile',
      JSON.stringify({
        solo: soloGames,
        team: teamGames
      })
    );
  }, [soloGames, teamGames]);

  // localStorage.clear('profile');


  const handlePersonNameChange = (event) => {
    setPerson(event.target.value);
  };

  const searchForProfile = async (name) => {
    try {
      setIsSearching(true);

      await fetch(`${endpoint}/.netlify/functions/searchName?name=${name}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 0) {
          setCheck(true);
          sortGames(res);
          localStorage.setItem('name', name);
        } else {
          setPerson('');
          setIsPersonInvalid(true);
        }
      });
      setIsSearching(false);
    } catch {
      setIsSearching(false);
    }
  };

  const clearPlayer = () => {
    localStorage.clear('profile');
    localStorage.clear('name');
    setCheck(false);
    setPerson('');
    setSoloGames([]);
    setTeamGames([]);
    setIsPersonInvalid(false);
  };

  const sortGames = (games) => {
    games.forEach((game) => {
      if (game.player === person) {
        setSoloGames((prevSoloGames) => [...prevSoloGames, game])
      } else {
        setTeamGames((prevTeamGames) => [...prevTeamGames, game])
      }
    })
  };

  return (
    <>
      {check === true ? (
        <Profile person={person} soloGames={soloGames} teamGames={teamGames} clearPlayer={clearPlayer}/>
      ) : (
        <div className="mobile-container">
          <div className="d-flex flex-column m-2 text-center align-items-center">
            <h1>My Profile</h1>
            <Form className="mt-3 mb-3">
              <Form.Group>
                <Form.Label>Search for your profile</Form.Label>
                <Form.Control 
                  placeholder="name" 
                  value={person} 
                  isInvalid={isPersonInvalid}
                  disabled={isSearching}
                  onChange={handlePersonNameChange}/>
                  {isPersonInvalid && (
                <Form.Text className="text-danger">
                  invalid name, try searching again
                </Form.Text>
              )}
              </Form.Group>
            </Form>
            <Button style={{ color:"white", backgroundColor: "#395144", border: "none"}} onClick={() => searchForProfile(person)}>
              {isSearching ? (
              <Spinner animation="border" size="sm" role="status" className="me-2">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              'Search'
            )}
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default MyProfile;