const db = require('../models/doublebogeyModel');

const courseController = {};

courseController.getCourseInfo = (req, res, next) => {
  const course = req.query.course;
  const searchQuery = `SELECT * FROM "public.Courses" WHERE "courseName" = '${course}'`;

  db.query(searchQuery)
    .then((data) => {
      res.locals.courseInformation = data.rows;
      return next();
    })
    .catch((err) => {
      console.log('Error in the getCourseInfo middleware', err);
      next(err);
    });
};

module.exports = courseController;