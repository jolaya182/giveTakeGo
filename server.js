/* *
  title: server.js 

  date: 10/26/2020

  author:  javier olaya

  description: this server handles the calls to the db responding with
  library data that is stored in the sqlite3 database
         
 */
const express = require('express')
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database('./sqlite/libraryDatabase.db');
let sql = "";

db.run('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, available ,  title , timestamp )');

app.use(bodyParser.json());
app.use(function(req, res, next){
  res.header("Content-Type", "application/json; charset=utf-8");
  res.header("Access-Control-Allow-Headers", 'Content-Type');
    next();
});


app.get('/request', (req, res)=>{
  sql = "SELECT * FROM books";
  db.all(sql,[], (err, rows)=>{
    if(err){
      return console.log("error->",err.message)
    }
    console.log("all the rows: ", rows);
    rows.forEach((row)=>{
      console.log(row.title);

    })
  })
  console.log("message received");
  res.send("good");
});

// app.get('request/', ()=>{});

app.post('/request', (req, res)=>{
  sql = `INSERT INTO  books( available, title, timestamp) VALUES( ${false}, 'ft' ,${4} )`; 
  db.run(sql,[], function(err){
    if(err){
      return console.log("error->",err.message)
    }
    console.log("a row was has been inserted with this id", this.lastID  );
    res.send("a row was has been inserted "+ this.changes  );

  })
  
});

// app.delete('request/', ()=>{});



app.listen(port, ()=>console.log(`listening to port ${port}`));
// db.close();