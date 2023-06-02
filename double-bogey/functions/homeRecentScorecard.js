const db = require('../doublebogeyModel');

// Define the serverless function
exports.handler = async function () {
  try {
    // Execute your database query
    const searchQuery = `SELECT * FROM "public.Games" WHERE "date" = (SELECT MAX("date") FROM "public.Games");`;
    const data = await db.query(searchQuery);

    // Return the response
    return {
      statusCode: 200,
      body: JSON.stringify(data.rows),
    };
  } catch (error) {
    // Handle any errors and return an appropriate response
    console.error('Error in getScores', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
