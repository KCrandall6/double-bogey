const db = require('../doublebogeyModel');

exports.handler = async function (event, context) {
  try {

    console.log('on the back', JSON.parse(event.body))
    // Parse the incoming data from the request body
    const { name, course, date, scores, total } = JSON.parse(event.body);

    // Construct the query to insert the game data
    const queryString = `
      INSERT INTO "public.Games" ("player", "course", "date", "scores", "total")
      VALUES ($1, $2, $3, $4, $5)
    `;
    const queryValues = [name, course, date, scores, total];

    // Execute the query using the database connection
    const result = await db.query(queryString, queryValues);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('Error inserting data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
