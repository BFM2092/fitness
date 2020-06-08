const express = require("express");
const usersRouter = express.Router();

const { getUserByUsername, creatingUser, getUser } = require("../fitnessDB/users")


usersRouter.use((req, res, next) => {
    console.log("a request is being made to /users");

    next();
});

usersRouter.get("/", async (req, res) => {
    const users = await getUser();

    res.send({
        users,
    });
});

usersRouter.post("/login", async (req, res, next) => {
    const {username, password} = req.body;

    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password",
        });
    }

    try {
        const user = await getUserByUsername(username);

        if (user && user.password == password) {
            res.send({ message:"you're logged in!"})
        } else {
            next({
                name: "IncorrectCredentialsError",
                message: "Username or password is incorrect",
            })
        } 
    } catch (error) {
        console.log(error);
        next(error);
    }
});

usersRouter.post("/register", async (req, res, next) => {
    const {username, password} = req.body;

    try {
        const _user = await getUserByUsername(username);

        if (_user) {
            next({
                name: "UserExistsError",
                message: "A user by that username already exists"
            });
        }

        const user = await creatingUser({
            username,
            password
        });

        res.send({
            message: "Thanks for signing up brah"
        });
    } catch ({name, message}) {
        next({name, message})
    }
})

module.exports = usersRouter;

// curl -X POST http://localhost:3000/api/users/register -d '{"username": "b-rye", "password": "bDaKing"}' -H "Content-Type: application/json"
// curl http://localhost:3000/api/users/login -H "Content-Type: application/json" -X POST -d '{"username": "fonsi", "password": "password1"}' 