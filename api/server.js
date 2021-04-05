// BUILD YOUR SERVER HERE
const express = require("express");
const server = express();

//APPLY MIDDLEWARE
server.use(express.json());

//IMPORT DATA MODEL
const Users = require("./users/model");

//CREATE A NEW USER
server.post("/api/users", (req, res) => {
  const newUser = req.body;

  if (!newUser.name || !newUser.bio) {
    res.status(400).json("Name and bio are required");
  } else {
    Users.insert(newUser)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
});

//RETURN ALL USERS
server.get("/api/users", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

//GET USER BY ID
server.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);

    if (!user) {
      res.status(404).json("User doesn't exist");
    } else {
      res.status(201).json(user);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//DELETE USER BY ID
server.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.remove(id);

    if (!user) {
      res.status(404).json("User doesn't exist");
    } else {
      res.status(201).json(user);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//UPDATE USER BY ID
server.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    if (!changes.name || !changes.bio) {
      res.status(400).json("Name and bio are required");
    } else {
      const user = await Users.update(id, changes);

      if (!user) {
        res.status(404).json("User doesn't exist");
      } else {
        res.status(201).json(user);
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
