import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';
import { endpoint } from '../../configEndpoint';
import {Link} from 'react-router-dom';

const RecentScorecard = ({recentCard, formatTimestamp}) => {

  const [coursePar, setCoursePar] = useState(0);

  useEffect(() => {
    fetch(`${endpoint}/.netlify/functions/getCourseInfo?course=${recentCard[0].course}`)
    .then((res) => res.json())
    .then((res) => {
      setCoursePar(JSON.parse(res[0].pars).reduce((cur, acc) => cur + acc, 0));
    })
  })

  return (
    <>
      <div className='d-flex mx-auto justify-content-between'>
        <p className="home-scores"><em><b>Course: </b></em>{recentCard[0].course}</p>
        <p className="home-scores"><em><b>Date: </b></em>{formatTimestamp(recentCard[0].date)}</p>
        <p className="home-scores"><em><b>Course Par: </b></em>{coursePar}</p>
      </div>
      <Link to="/topScores" style={{ textDecoration: 'none', color: 'black' }}>
        <Table className="align-middle mx-auto" striped hover bordered responsive="sm" style={{backgroundColor: "white", border: "2px solid #395144", overflowX: 'auto', maxWidth: "700px", fontSize: '12px'}}>
          <thead>
            <tr className="align-middle" >
              <th>Name</th>
              <th>Total Score</th>
              <th>Score (no handicap)</th>
            </tr>
          </thead>
          <tbody>
            {recentCard.map((person, index) => (
              <tr key={index + 1}>
                <th>{person.player}</th>
                <th>{person.total}</th>
                <th>{person.total - coursePar >= 0 ? "+" : "-"}{Math.abs(person.total - coursePar)}</th>
              </tr>
            ))}
          </tbody>
        </Table>
      </Link>
    </>
  )
};

export default RecentScorecard