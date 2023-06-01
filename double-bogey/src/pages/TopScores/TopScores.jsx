import React, { useState, useEffect} from 'react';
import {Button, Table} from 'react-bootstrap';

import {endpoint} from '../../configEndpoint';
import VBScorecard from './VBScorecard';
import VBIndividual from './VBIndividual';

const TopScores = () => {

  const [scores, setScores] = useState([]);
  const [groupedScores, setGroupedScores] = useState([]);
  // used to delineate whether to view by scorecard or view by individual scorers; default is by scorecard
  const [vbInd, setVbInd] = useState(false);

  const groupUp = (scores) => {
    let groups = [];
    let card = [];
    for (let i = 0; i < scores.length; i++) {
      if (card.length < 1 || scores[i].date === card[0].date) {
        card.push(scores[i]);
      } else {
        groups.push(card);
        card = [scores[i]];
      }
    }
    if (card.length > 0) {
      groups.push(card);
    }
    setGroupedScores(groups);
  };

  useEffect(() => {
    fetch(`${endpoint}/.netlify/functions/getScores`)
    .then((res) => res.json())
    .then((res) => {
      setScores(res);
      groupUp(res);
    });
  }, []);

  const changeViewBy = () => {
    setVbInd(!vbInd);
  };

  const formatTimestamp = (timestamp) => {
    const dateStartIndex = timestamp.indexOf('"') + 1;
    const dateEndIndex = timestamp.lastIndexOf('"');
    const dateString = timestamp.substring(dateStartIndex, dateEndIndex);
    
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
    
    return 'Invalid Date';
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center pt-3">
      <h1>Latest Scores</h1>
      <Button onClick={() => changeViewBy()} style={{ color:"white", backgroundColor: "#395144", border: "none"}}>View by</Button>
      <div className="mobile-container">
        {vbInd === true ? (
          <div className='mt-4 m-2'>
            <Table className="align-middle" striped hover bordered responsive style={{backgroundColor: "white", border: "2px solid #395144",}}>
              <thead style={{fontSize: '23px'}}>
                <tr className="align-middle">
                  <th>Name</th>
                  <th>Course</th>
                  <th>Total Score</th>
                  <th>Date</th>
                </tr>
              </thead>
              {scores.map((person, index) => (
                <VBIndividual key={index + 1} person={person} formatTimestamp={formatTimestamp}/>
              ))}
            </Table>
          </div>
        ) : (
          groupedScores.map((group, index) => (
            <VBScorecard key={index + 1} group={group} formatTimestamp={formatTimestamp}/>
          ))
        )}
      </div>
    </div>
  )
}

export default TopScores;