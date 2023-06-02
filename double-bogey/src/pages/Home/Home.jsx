import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Scorecard from './Scorecard';
import NewScorecard from './Modals/NewScorecard';
import RecentScorecard from './RecentScorecard';
import RecentNews from './RecentNews';
import { endpoint } from '../../configEndpoint';

const Home = () => {

  const [existingGame, setExistingGame] = useState(false);
  const [course, setCourse] = useState({
    courseName: '',
    pars: [],
    blackTees: [],
    whiteTees: [],
    redTees: []
  });
  const [scorecard, setScorecard] = useState([]);
  const [show, setShow] = useState(false);
  const [recentCard, setRecentCard] = useState([]);
  const [articles, setArticles] = useState([]);

  // check if a game is already in progress
  useEffect(() => {
    try {
      const storedScorecard = localStorage.getItem('scorecard');
      const storedCourse = localStorage.getItem('course');
      if (storedScorecard) {
        const parsedScorecard = JSON.parse(storedScorecard);
        const parsedCourse = JSON.parse(storedCourse)
        setScorecard(parsedScorecard);
        setCourse(parsedCourse);
        setExistingGame(true);
      } else {
        fetchRecentScorecard();
        fetchRecentNews();
      }
    } catch (error) {
      console.error('Error parsing scorecard data:', error);
    }
  }, []);

  const fetchRecentScorecard = () => {
    fetch(`${endpoint}/.netlify/functions/homeRecentScorecard`)
    .then((res) => res.json())
    .then((res) => setRecentCard(res));
  }

  const fetchRecentNews = () => {
    fetch('https://site.api.espn.com/apis/site/v2/sports/golf/pga/news')
    .then((res) => res.json())
    .then((res) => setArticles(res.articles))
  }

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

  const startNewGame = async (selectedCourse) => {
    await fetch(`${endpoint}/.netlify/functions/getCourseInfo?course=${selectedCourse}`)
      .then((res) => res.json())
      .then((res) => {
        const parsedCourse = {
          ...res[0],
          pars: JSON.parse(res[0].pars),
          blackTees: JSON.parse(res[0].blackTees),
          whiteTees: JSON.parse(res[0].whiteTees),
          redTees: JSON.parse(res[0].redTees),
        };
        setCourse(parsedCourse);
        localStorage.setItem('course', JSON.stringify(parsedCourse));
        setScorecard([]); 
        setExistingGame(true); 
        handleClose();
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {existingGame ? (
        <div>
          <Scorecard course={course} scorecard={scorecard} setScorecard={setScorecard} setExistingGame={setExistingGame}/>
        </div>
      ) : (
        <>
          <div className='d-flex text-center justify-content-center mt-4 me-5 ms-5'>
            <h3>To start a new scorecard, click the button below</h3>
          </div>
          <div className='d-flex text-center justify-content-center'>
            <Button size="lg" onClick={handleShow} style={{ color:"white", backgroundColor: "#395144", border: "none"}}>
              New Scorecard
            </Button>
            <NewScorecard show={show} handleClose={handleClose} course={course} setCourse={setCourse} startNewGame={startNewGame}/>
          </div>
          <div className="d-flex flex-column mt-3 m-2 text-center">
            <h5 className='mt-4'>Check who has been golfing recently?</h5>
            {recentCard.length > 0 && (
              <RecentScorecard recentCard={recentCard} formatTimestamp={formatTimestamp} />
            )}
            <h6>Click to see more scores!</h6>
          </div>
          <div className="mobile-container">
            <div className="d-flex flex-column mt-3 m-2 text-center">
              <h5 className='mt-4'>Check out the latest golf news</h5>
              {RecentNews.length > 0 && (
                <RecentNews articles={articles}/>
              )}
              <h6 className='mt-4'>Click to see more news!</h6>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Home;