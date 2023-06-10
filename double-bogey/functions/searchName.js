const db = require('../doublebogeyModel');

// Define the serverless function
exports.handler = async function (event, context) {
  try {
    // Retrieve any required data from the event object (e.g., query parameters)
    const { name } = event.queryStringParameters;

    // Execute your database query
    const searchQuery = `SELECT * FROM "public.Games" WHERE "player" LIKE '%${name}%'`;
    const data = await db.query(searchQuery);

    // Return the response
    return {
      statusCode: 200,
      body: JSON.stringify(data.rows),
    };
  } catch (error) {
    // Handle any errors and return an appropriate response
    console.error('Error in searchName', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};