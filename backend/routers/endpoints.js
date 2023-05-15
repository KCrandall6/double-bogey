const express = require('express');
const router = express.Router();
const path = require('path');
const courseController = require('../controllers/courseController.js');

router.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../../build/index.html'));
});

router.get('/game', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../../build/index.html'));
});

router.get('/courseOverview', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../../build/index.html'));
});

router.get('/topScores', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../../build/index.html'));
});

router.get('/myProfile', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../../build/index.html'));
});

router.get('/share', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../../build/index.html'));
});

// COURSE CONTROLLERS

router.get('/getCourseInfo', courseController.getCourseInfo, (req, res) => 
  res.status(200).json(res.locals.courseInformation)
);

module.exports = router;