const express = require("express");
const routinesRouter = express.Router();

routinesRouter.get("/", (req, res, next) => {
    console.log("this is a request being made to /routines");

    next();
});

routinesRouter.get("/", (req, res) => {
    const routines = await getAll
})