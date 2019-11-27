const express = require("express");
const router = express.Router();

const tokens = require("./tokens")

const users = [
    { username: "mark", password: "giraffe" }
];

router.post("/", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => username === user.username && password === user.password);

    if (user) {
        const token = tokens.create(username);
        res.status(200).send({ token });
    } else {
        res.status(400).send({error: "Invalid Credentials"});
    }
});

module.exports = router;