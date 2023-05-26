import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar'

import Home from './pages/Home/Home';
import CourseOverview from './pages/CourseOverview/CourseOverview';
import TopScores from './pages/TopScores/TopScores';
import MyProfile from './pages/MyProfile/MyProfile';
import Share from './pages/MyProfile/Share'
import News from './pages/News/News';

const Main = () => {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courseOverview" element={<CourseOverview />} />
        <Route path="/topScores" element={<TopScores />} />
        <Route path="/news" element={<News />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/share" element={<Share />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Main;