const { client } = require("./client");

async function creatingActivity({ id, name, description }) {
  try {
    await client.query(
      `
              INSERT INTO activities(id, name, description)
              VALUES ($1, $2, $3)
              RETURNING *;
              `,
      [id, name, description]
    );
  } catch (error) {
    throw error;
  }
}

async function getAllActivities() {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM activities;
        `);

        return rows;
    } catch (error) {
        throw error;
    }
}

// async function getActivitiesById(activityId) {
//   try {
//     const { activity } = await client.query(`
//         SELECT *
//         FROM activities
//         WHERE id=$1;
//     `,
//     [activityId]
//     );

//     if (!)
//   }
// }

async function updateActivity(activityId, {name, description}) {
  const updateFields = {};

  if (name) {
      updateFields.name = name;
  };

  if (description) {
      updateFields.description = description;
  };
    const setString = Object.keys(updateFields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");

    try {
      if (setString.length > 0) {
        await client.query(`
            UPDATE activities
            SET ${setString}
            WHERE id=${activityId}
            RETURNING *;
        `, 
        Object.values(updateFields)
        );
      }
    } catch (error) {
      throw error
    }
}

module.exports = {
  creatingActivity,
  getAllActivities,
  updateActivity
};
