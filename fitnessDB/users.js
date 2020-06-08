const { client } = require("./client");

async function creatingUser({username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users(username, password)
            VALUES($1, $2)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
            `,
      [username, password]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser() {
  try {
    const { rows } = await client.query(`
        SELECT username, password 
        FROM users;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try{
    const {
      rows: [user],
    } = await client.query(`
        SELECT *
        FROM users
        WHERE username=$1
    `,
    [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  creatingUser,
  getUser,
  getUserByUsername
};
