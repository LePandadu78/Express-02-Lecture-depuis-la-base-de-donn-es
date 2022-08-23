const database = require("./database");


const getUsers = (req, res) => {
  console.log(req)
  database
  .query("select * from users")
  .then(([users]) => {
    res.json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });
};

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postUsers = (req, res) => {
    const { firstname, lastname, email } = req.body;
  
    database
      .query(
        "INSERT INTO users(firstname, lastname, email) VALUES (?, ?, ?)",
        [firstname, lastname, email]
      )
      .then(([result]) => {
        res.location(`/api/users/${result.insertId}`).sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error saving user");
      });
  };

  const updateUsers = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, email } = req.body;
  
    database
      .query(
        "update users set firstname = ?, lastname = ?, email = ?",
        [firstname, lastname, email]
      )
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error editing user");
      });
  };

  const deleteUsers = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("select * from users to delete id = ?", [id])
      .then(([users]) => {
        if (users[0] != null) {
          res.json(users[0]);
        } else {
          res.status(404).send("Not Found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };

module.exports = {
  getUsers,
  getUsersById,
  postUsers,
  updateUsers,
  deleteUsers,
};
