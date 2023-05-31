import React, { useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';

import {endpoint} from '../../configEndpoint';
import VBScorecard from './VBScorecard';
import VBIndividual from './VBIndividual';

const TopScores = () => {

  const [scores, setScores] = useState([]);
  // const [groupedScores, setGroupedScores] = useState([]);
  // used to delineate whether to view by scorecard or view by individual scorers; default is by scorecard
  const [vbInd, setVbInd] = useState(false);

  useEffect(() => {
    fetch(`${endpoint}/.netlify/functions/getScores`)
    .then((res) => res.json())
    .then((res) => {
      setScores(res);
      // groupUp(res);
    });
  }, []);

  console.log('scores', scores)

  // const groupUp = (groups) => {
  //   let card = [];
  //   for (let i = 0; i < groups.length; i++) {
  //     if (card.length < 1 || groups[i].date === card[0].date) {
  //       card.push(groups[i])
  //     } else {
  //       setGroupedScores([...groupedScores, card]);
  //       card = [];
  //     }
  //   }
  //   if (card.length > 0) {
  //     setGroupedScores([...groupedScores, card]);
  //   }
  // };

  const changeViewBy = () => {
    setVbInd(!vbInd);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center pt-3">
      <h1>Latest Scores</h1>
      <Button onClick={() => changeViewBy()} style={{ color:"white", backgroundColor: "#395144", border: "none"}}>View by</Button>
      {vbInd === true ? (
        scores.map((person, index) => (
          <VBIndividual key={index + 1} person={person}/>
        ))
      ) : (
        scores.map((person, index) => (
          // let group = [];
          <VBScorecard />
        ))
      )}
    </div>
  )
}

export default TopScores;