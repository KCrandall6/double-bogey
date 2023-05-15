const express = require('express');
const serverless = require('serverless-http');
// const path = require('path');
const app = express();
// const PORT = 8080;
// const endpoints = require('./routers/endpoints');
const router = express.Router();
const courseController = require('./controllers/courseController');
// const cors = require('cors');

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, '../build')));

//changed this
// app.use('/.netlify/functions/api', endpoints);
// app.use('/', endpoints);

app.use('/.netlify/functions/server', router);

router.get('/test', (req, res) => {
  res.json({
    'hello': 'test from the api'
  });
});

// app.use((req, res) =>
//   res.status(404).send("This is not the page you're looking for...")
// );

// app.use((err, req, res, next) => {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 500,
//     message: { err: 'An error occurred' },
//   };
//   const errorObj = Object.assign({}, defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message);
// });

// app.listen(PORT, () => {
//   console.log(`Server is listening on port: http://localhost:${PORT}`);
// });

// COURSE CONTROLLERS

router.get('/getCourseInfo', courseController.getCourseInfo, (req, res) => 
  res.status(200).json(res.locals.courseInformation)
);

// API TEST CONTROLLER

// router.get('/testAPI', (req, res) => {
//   res.json({
//     'hello': 'test from the api'
//   });
// });

module.exports.handler = serverless(app);
