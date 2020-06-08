const { client } = require("./client");

async function creatingRoutineActivities({
  id,
  routineId,
  activityId,
  duration,
  count,
}) {
  try {
    await client.query(
      `
              INSERT INTO routine_activities(id, "routineId", "activityId", duration, count)
              VALUES ($1, $2, $3, $4, $5)
              RETURNING *;
          `,
      [id, routineId, activityId, duration, count]
    );
  } catch (error) {
    throw error;
  }
}



module.exports = {
    creatingRoutineActivities,
}