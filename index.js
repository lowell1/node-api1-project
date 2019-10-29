// implement your API here
const express = require("express");
const server = express();
const db = require("./data/db");
server.use(express.json());

const port = 8000;

server.post("/api/users", (req, res) => {
    console.log(req.body)
    if(!(req.body.name && req.body.bio)) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
        return;
    }

    db.insert(req.body)
    .then(() => {
        res.status(201).json(req.body);
    })
    .catch(() => {
        res.status(500).json({ error: "There was an error while saving the user to the database" })
    });
})

server.get("/api/users", (req, res) => {
    db.find()
    .then(users => res.status(200).json(users))
    .catch(() => res.status(500).json({ error: "The users information could not be retrieved." }));
})

server.listen(port, () => {
    console.log(`server listening ${port}`);
})