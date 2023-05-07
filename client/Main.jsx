import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar'

import Home from './pages/Home/Home';
import Game from './pages/Game/Game';
import CourseOverview from './pages/CourseOverview/CourseOverview';
import TopScores from './pages/TopScores/TopScores';
import MyProfile from './pages/MyProfile/MyProfile';

const Main = () => {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/courseOverview" element={<CourseOverview />} />
        <Route path="/topScores" element={<TopScores />} />
        <Route path="/myprofile" element={<MyProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Main;