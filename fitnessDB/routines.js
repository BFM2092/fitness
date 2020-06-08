const { client } = require("./client");


async function creatingRoutines({creatorId, public, name, goal }) {
  try {
    await client.query(
      `
              INSERT INTO routines("creatorId", public, name, goal)
              VALUES ($1, $2, $3, $4)
              RETURNING *;
          `,
      [creatorId, public, name, goal]
    );
  } catch (error) {
    throw error;
  }
}



async function getAllRoutines() {
  try {
    const { rows } = await client.query(`
            SELECT *
            FROM routines;
        `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutines() {
    try {
        const {rows} = await client.query(`
            SELECT *
            FROM routines
            WHERE public=true;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = {
  creatingRoutines,
  getAllRoutines,
  getPublicRoutines
};
