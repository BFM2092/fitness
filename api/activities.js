const express = require("express");
const activitiesRouter = express.Router();

const { getAllActivities, creatingActivity } = require("../fitnessDB/activities")

const { requireUser } = require('./utils');

activitiesRouter.use((req, res, next) => {
    console.log("a request is being made to /activities")

    next();
});

activitiesRouter.get("/", async (req, res) => {
    const activities = await getAllActivities();

    res.send({
        activities,
    });
});

activitiesRouter.post("/", requireUser, async (req, res) => {
    const newActivities = await creatingActivity();

    res.send({
        newActivities,
    });
});

activitiesRouter.patch("/:activityId", requireUser, async (req, res, next) => {
    const {activityId} = req.params;

    try {
            const updatedActivity = await updateActivity(activityId, req.body);
            res.send({newActivity: updatedActivity})

    } catch ({ name, message}) {
        next({ name, message });
    }
});

activitiesRouter.get("/:activityId/routines", (req, res, next) => {

})

module.exports = activitiesRouter;