const db = require('../doublebogeyModel');

exports.handler = async function (event, context) {
  try {
    console.log('on the back', JSON.parse(event.body));
    const { name, course, date, scores, total } = JSON.parse(event.body);

    if (!name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Player name is required' }),
      };
    }

    const playerResult = await db.query('SELECT * FROM "public.Players" WHERE "player_name" = $1', [name]);

    let playerId;
    if (playerResult.rows.length === 0) {
      const playerInsertResult = await db.query('INSERT INTO "public.Players" ("player_name") VALUES ($1) RETURNING "player_id"', [name]);
      playerId = playerInsertResult.rows[0].player_id;
    } else {
      playerId = playerResult.rows[0].player_id;
    }

    const queryString = `
      INSERT INTO "public.Games" ("player_id", "player", "course", "date", "scores", "total")
      SELECT $1, $2, $3, $4, $5, $6
      FROM "public.Players"
      WHERE "public.Players"."player_id" = $1
    `;
    const queryValues = [playerId, name, course, date, scores, total];

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
