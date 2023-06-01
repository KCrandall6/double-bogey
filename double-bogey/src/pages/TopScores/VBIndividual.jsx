import React from 'react';

const VBIndividual = ({person, formatTimestamp}) => {

  return (
    <>
    <tbody>
          <tr>
            <th>{person.player}</th>
            <th>{person.course}</th>
            <th>{person.total}</th>
            <th>{formatTimestamp(person.date)}</th>
          </tr>
        </tbody>
    </>
  )
};

export default VBIndividual;