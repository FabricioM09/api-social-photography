const express = require('express');
const cors = require('cors'); /*Cors permite comunicar el backend y el frontend*/ 
const app = express();
const path = require('path');

//Settings
app.set('port', process.env.PORT || 4000);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//middlewares
app.use(cors());
app.use(express.json());

module.exports = app;