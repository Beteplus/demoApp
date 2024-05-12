// import express from express


const express = require('express');
const app = express();

//import mysql

const mysql = require("mysql2")
// Create a connection pool
const dbConfig = {
    connectionLimit: "10",
    host: "localhost",
    user: "evanDemo",
    password: "evandemo",
    database: "evandemo"
  };
  // Get a connection from the pool
const Connection = mysql.createConnection(dbConfig);
Connection.connect((err)=>{
if (err) throw err;
console.log("Db connected");

})


app.get('/', (req,res)=>{
res.send('testing')
})


const port = 4000;

// set up listner
app.listen(port,()=>console.log(`listning on port ${port}`));
