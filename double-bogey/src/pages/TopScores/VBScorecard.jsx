import React, { useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';
import {endpoint} from '../../configEndpoint';

const VBScorecard = ({group, formatTimestamp}) => {

  const [coursePar, setCoursePar] = useState(0);

  useEffect(() => {
    fetch(`${endpoint}/.netlify/functions/getCourseInfo?course=${group[0].course}`)
    .then((res) => res.json())
    .then((res) => {
      setCoursePar(JSON.parse(res[0].pars).reduce((cur, acc) => cur + acc, 0));
    })
  })

  return (
    <div className='m-2 mt-3' style={{maxWidth: "700px"}}>
      <div className='d-flex justify-content-start'>
        <p className='table-scores'><em><b>Course: </b></em>{group[0].course}</p>
        <p className='table-scores'><em><b>Date: </b></em>{formatTimestamp(group[0].date)}</p>
        <p className='table-scores'><em><b>Course Par: </b></em>{coursePar}</p>
      </div>
      <Table className="align-middle" striped hover bordered responsive style={{backgroundColor: "white", border: "2px solid #395144",}}>
        <thead className="align-middle" style={{fontSize: '20px' }}>
          <tr>
            <th>Name</th>
            <th>Total Score</th>
            <th>Score (no handicap)</th>
          </tr>
        </thead>
        <tbody>
            {group.map((person, index) => (
              <tr key={index + 1}>
                <th>{person.player}</th>
                <th>{person.total}</th>
                <th>{person.total - coursePar >= 0 ? "+" : "-"}{Math.abs(person.total - coursePar)}</th>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
};

export default VBScorecard;