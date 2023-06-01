import React from 'react';
import {Table} from 'react-bootstrap';

const VBScorecard = ({group, formatTimestamp}) => {

  return (
    <div className='m-2' >
      <div className='d-flex justify-content-start align-content-end m-1'>
        <p className='table-scores'><em><b>Course: </b></em>{group[0].course}</p>
        <p className='table-scores'><em><b>Date: </b></em>{formatTimestamp(group[0].date)}</p>
      </div>
      <Table striped hover bordered responsive style={{backgroundColor: "white", border: "2px solid #395144",}}>
        <thead style={{fontSize: '23px'}}>
          <tr>
            <th>Name</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
            {group.map((person, index) => (
              <tr key={index + 1}>
                <th>{person.player}</th>
                <th>{person.total}</th>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
};

export default VBScorecard;