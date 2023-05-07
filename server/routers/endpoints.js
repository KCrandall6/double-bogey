const express = require('express');
const router = express.Router();
const path = require('path');

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

module.exports = router;
