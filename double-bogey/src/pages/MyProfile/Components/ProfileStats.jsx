import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

const ProfileStats = ({person, soloGames, teamGames}) => {
  
  const [avg, setAvg] = useState({
    'solo': 'N/A',
    'team': 'N/A'
  });

  useEffect(() => {
    const averages = {
      'solo': calcAvg(soloGames),
      'team': calcAvg(teamGames)
    };
    setAvg(averages);
  },[soloGames, teamGames]);

  const calcAvg = (data) => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      if (Number(data[i].total) > 64) {
        total += Number(data[i].total);
      } else if (Number(data[i].total) < 64) {
        // extrapolate score; i.e. assumed they only played 9 holes
        total += Number(data[i].total * 2);
      }
    };
    if (Math.round(total/data.length) > 64) {
      return Math.round(total/data.length);
    } else {
      return 'N/A';
    }
  }

  return (
    <>
      <Container className='d-flex flex-column text-center justify-content-center mt-2'>
        <h1 className="m-2">Analyze Your Profile</h1>
          <h2 className="m-2"><u>{person}</u></h2>
          <Row className="">
            <Col>
              <h5><b>Total Games</b></h5>
              <Row>
                <Col>
                  <h6><em><b>Solo:</b></em></h6>
                </Col>
                <Col>
                  <h6><em><b>Team:</b></em></h6>
                </Col>
              </Row>
            </Col>
            <Col>
              <h5><b>Average Scores</b></h5>
              <Row>
              <Col>
                  <h6><em><b>Solo:</b></em></h6>
                </Col>
                <Col>
                  <h6><em><b>Team:</b></em></h6>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col>
                  <h6>{soloGames.length}</h6>
                </Col>
                <Col>
                  <h6>{teamGames.length}</h6>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <h6>{avg.solo}</h6>
                </Col>
                <Col>
                  <h6>{avg.team}</h6>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
    </>
  )
};

export default ProfileStats;