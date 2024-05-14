// import express from express
// import express
const express = require('express');
const app = express();

// import mysql
const mysql = require("mysql2");

// import bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10; // number of salt rounds for bcrypt

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
Connection.connect((err) => {
  if (err) throw err;
  console.log("Db connected");
});

// use express.json() middleware to parse the request body
app.use(express.json());

app.get('/', (req, res) => {
  res.send('testing');
});

// post request to add new employee

app.post('/login', (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const sql = 'SELECT * FROM employee_test WHERE email = ?';
  const values = [email];

  Connection.query(sql, values, async (err, result) => {
    if (err) throw err;
    console.log(result);

    if (result.length > 0) {
      const user = result[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const response = {
          status: 'success',
          message: 'Login successful',
        };
        res.status(200).json(response);
      } else {
        const response = {
          status: 'failure',
          message: 'Login failed',
        };
        res.status(200).json(response);
      }
    } else {
      const response = {
        status: 'failure',
        message: 'Login failed',
      };
      res.status(200).json(response);
    }
  });
});

const port = 4000;

// set up listener
app.listen(port, () => console.log(`listening on port ${port}`));



// const sql = `INSERT INTO employee_test (first_name, last_name, email, password) VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${req.body.password}')`;

// // excute query
// Connection.query(sql,(err,result)=>{
//     if (err) throw err;
//     console.log("employee added");


// })
// // send a response back to the client
// const response = {
//     status:'success',
//     message: 'Employee added successfuly'
// }

// // this is change the responce to json
// res.status(200).json(response)
// })
// // api end point for login
// //allow CORS to all
// app.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin','*');
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "OPTIONS, GET, POST, PUT, PATCH, DELET"
//     )
//     res.setHeader("Access-Control-Allow-Headers","Content-type, Authorization")
    
//     next()
// })

// app.post('/login',(req,res)=>{
//     // this colnsole make show to us on cnsl that insert on login page the req.body is actually the value
//     console.log(req.body);

//     const sql = `SELECT * FROM employee_test WHERE email = '${req.body.email} AND password = '${req.body.password}'`

//     Connection.query(sql,(err,result)=>{
//         if (err) throw err;
//         console.log(result);

//         //check the result is empty or not

//         if(result.length>0){
//             // if the result is not empty then we will send the response to the client
//             const response = {
//                 status:'success',
//                 message: 'log in succesfuly'
//             }
//             res.status(200).json(response)
//         }else{
//             const response = { status:'failuer',
//             message: 'Login Failed'}

//         }
//         res.status(200).json(response);
        
//     })
    
// })




// // post request to add neww employee
// app.post('/add-employee', (req,res)=>{
//     console.log("the employee added");
// })