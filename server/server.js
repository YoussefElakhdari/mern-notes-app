const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const routes = require('./routes/notes');
const {connect} = require('./config/db');
const users = require('./routes/users');
const cors = require('cors');


dotenv.config({
    path: './config/config.env'
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use('/api/v1/notes', routes);
app.use('/api/v1/users', users);

app.listen(3000, ()=>{
   try{
    connect();
    console.log('listening on 3001...');
   }catch(err){
    console.log(err.message);
   }
})