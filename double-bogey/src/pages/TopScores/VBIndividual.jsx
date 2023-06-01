import React, { useState, useEffect} from 'react';
import {endpoint} from '../../configEndpoint';

const VBIndividual = ({person, formatTimestamp}) => {

  const [coursePar, setCoursePar] = useState(0);

  useEffect(() => {
    fetch(`${endpoint}/.netlify/functions/getCourseInfo?course=${person.course}`)
    .then((res) => res.json())
    .then((res) => {
      setCoursePar(JSON.parse(res[0].pars).reduce((cur, acc) => cur + acc, 0));
    })
  })

  return (
    <>
    <tbody>
          <tr>
            <th>{person.player}</th>
            <th>{person.course}</th>
            <th>{person.total}</th>
            <th>{person.total - coursePar >= 0 ? "+" : "-"}{Math.abs(person.total - coursePar)}</th>
            <th>{formatTimestamp(person.date)}</th>
          </tr>
        </tbody>
    </>
  )
};

export default VBIndividual;