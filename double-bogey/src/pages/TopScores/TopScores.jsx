import React, { useState, useEffect} from 'react';
import {Table, Dropdown} from 'react-bootstrap';

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


  const sortBy = (type) => {
    if (!vbInd) {
      const sortedGroupedScores = [...groupedScores];
      sortedGroupedScores.sort((a, b) => {
        if (type === 'date') {
          const aDate = formatTimestamp(a[0].date);
          const bDate = formatTimestamp(b[0].date);
          return new Date(aDate) - new Date(bDate);
        } else if (type === 'course') {
          return a[0].course.localeCompare(b[0].course);
        }
        return 0;
      });
      setGroupedScores(sortedGroupedScores);
    } else {
      const sortedScores = [...scores];
      sortedScores.sort((a, b) => {
        if (type === 'date') {
          const aDate = formatTimestamp(a.date);
          const bDate = formatTimestamp(b.date);
          return new Date(aDate) - new Date(bDate);
        } else if (type === 'course') {
          return a.course.localeCompare(b.course);
        } else if (type === 'total') {
          return a.total - b.total;
        }
        return 0;
      });
      setScores(sortedScores);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center text-center pt-3">
      <h1>Latest Scores</h1>
      <div className="d-flex align-items-center justify-content-center">
        <div className='d-flex mt-2 mb-2' style={{maxWidth: "500px"}}>
          <Dropdown className="me-4">
            <Dropdown.Toggle style={{ color:"white", backgroundColor: "#395144", border: "none"}} id="dropdown-basic">
              View by
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => changeViewBy()}>Scorecard</Dropdown.Item>
              <Dropdown.Item onClick={() => changeViewBy()}>Player</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle style={{ color:"white", backgroundColor: "#395144", border: "none"}} id="dropdown-basic">
              Sort by
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => sortBy('date')}>Date</Dropdown.Item>
              <Dropdown.Item onClick={() => sortBy('course')}>Course</Dropdown.Item>
              {vbInd && (
                <>
                  <Dropdown.Item onClick={() => sortBy('total')}>Score</Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="mobile-container">
        {vbInd === true ? (
          <div className='mt-4 m-2'>
            <Table className="align-middle mx-auto" striped hover bordered responsive="sm" style={{backgroundColor: "white", border: "2px solid #395144", overflowX: 'auto', maxWidth: "700px"}}>
              <thead>
                <tr className="align-middle" style={{fontSize: '23px'}}>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Total Score</th>
                  <th>Score (no handicap)</th>
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