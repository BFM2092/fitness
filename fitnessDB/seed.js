const { client } = require("./client");

const { creatingUser,
        creatingActivity,
        creatingRoutines,
        creatingRoutineActivities
    } = require("./");

async function createTables() {
  try {
    await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username varchar(255) UNIQUE NOT NULL,
                password varchar(255) NOT NULL
            );

            CREATE TABLE activities (
                id SERIAL PRIMARY KEY,
                name varchar(255) UNIQUE NOT NULL,
                description TEXT NOT NULL
            );

            CREATE TABLE routines (
                id SERIAL PRIMARY KEY,
                "creatorId" INTEGER REFERENCES users(id),
                public BOOLEAN DEFAULT false,
                name varchar(255) UNIQUE NOT NULL,
                goal TEXT NOT NULL
            );

            CREATE TABLE routine_activities (
                id SERIAL PRIMARY KEY,
                "routineId" INTEGER REFERENCES routines(id),
                "activityId" INTEGER REFERENCES activities(id),
                duration INTEGER,
                count INTEGER,
                UNIQUE ("routineId", "activityId")
            );
        `);
  } catch (error) {
    throw error;
  }
}

async function dropTables() {
  try {
    await client.query(`
            DROP TABLE IF EXISTS routine_activities;
            DROP TABLE IF EXISTS routines;
            DROP TABLE IF EXISTS activities;
            DROP TABLE IF EXISTS users;
        `);
  } catch (error) {
    throw error;
  }
}

async function createInitialUsers() {
  try {
    await creatingUser({
      username: "fonsi",
      password: "password1",
    });

    await creatingUser({
      username: "merv",
      password: "demcanes",
    });

    await creatingUser({
      username: "drizzy",
      password: "ovo20",
    });
  } catch (error) {
    throw error;
  }
}

async function dehActivities() {
  try {
    await creatingActivity({
      id: 1,
      name: "dumbells",
      description: "gotta do them reps",
    });

    await creatingActivity({
      id: 2,
      name: "cycling",
      description: "gotta cycle broh",
    });

    await creatingActivity({
      id: 3,
      name: "benchpress",
      description: "gotta lift that broh",
    });
  } catch (error) {
    throw error;
  }
}

async function dehRoutines() {
  try {
    await creatingRoutines({
      id: 1,
      creatorId: 1,
      public: true,
      name: "leg day",
      goal: "get my legs shredded bro",
    });
  } catch (error) {
    throw error;
  }
}

async function dehRoutineActivities() {
  try {
    await creatingRoutineActivities({
      id: 1,
      routineId: 1,
      activityId: 1,
      duration: 20,
      count: 3,
    });
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    const { rows } = await client.query(`
        SELECT * FROM users;
    `);
    console.log(rows);

    const { rows: activityRows } = await client.query(`
        SELECT * FROM activities;
    `);
    console.log(activityRows);

    const { rows: routines } = await client.query(`
        SELECT * FROM routines;
    `);
    console.log(routines);

    const { rows: routineActivities } = await client.query(`
        SELECT * FROM routine_activities;
    `);
    console.log(routineActivities);
  } catch (error) {
    console.error(error);
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await dehActivities();
    await dehRoutines();
    await dehRoutineActivities();
  } catch (error) {
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
