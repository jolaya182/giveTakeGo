/* *
  title: server.js 

  date: 10/26/2020

  author:  javier olaya

  description: this server handles the calls to the sqlite3 database
  sending responding with library data
 */
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./sqlite/libraryDatabase.db");
let sql = "";

db.run(
  "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, available TEXT,  title TEXT, timeStamp TEXT)"
);

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Content-Type", "application/json; charset=utf-8");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/request", (req, res) => {
  if (req.body.id) {
    const { id } = req.body;
    sql = `SELECT * FROM books where id ='${id}' `;
    db.all(sql, [], (err, rows) => {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      res.send(rows);
      return;
    });
  } else {
    sql = "SELECT * FROM books";
    db.all(sql, [], (err, rows) => {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      res.send(rows);
    });
  }
});

app.post("/insert", (req, res) => {
  const { title } = req.body;
  const timeStamp = new Date().toISOString();

  sql = `INSERT INTO  books( available, title, timeStamp) VALUES( '${true}', '${title}', '${timeStamp}')`;
  db.run(sql, [], function (err) {
    if (err) {
      res.status(500).send({ error: err.message });
    }
    res.send({ id: this.lastID });
  });
});

app.post("/request", (req, res) => {
  const { title } = req.body;
  sql = `SELECT * FROM books WHERE '${title}' = title`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.message });
    }
    res.send(rows);
  });
});

app.delete("/request", (req, res) => {
  const { id } = req.body;
  sql = `DELETE  FROM books WHERE id = '${id}'`;
  db.run(sql, [], function (err) {
    if (err) {
      res.status(500).send({ error: err.message });
    }
    res.send({});
  });
});

app.listen(port, () => console.log(`listening to port ${port}`));
// db.close();
