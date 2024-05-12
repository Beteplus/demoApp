// import express from express
import express from 'express'

// const express = require('express');
const app = express();

app.get('/', (req,res)=>{
res.send('testing')
})


const port = 4000;

// set up listner
app.listen(port,()=>console.log(`listning on port ${port}`));
