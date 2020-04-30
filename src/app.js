const express = require('express');
const cors = require('cors'); /*Cors permite comunicar el backend y el frontend*/ 
const app = express();
const path = require('path');
const multer = require('multer');

//Settings
app.set('port', process.env.PORT || 4000);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//middlewares
app.use(cors());
app.use(express.json());
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({storage}).single('image'));

//routes
app.use('/api/registerusers', require('./routes/registerusers'));
app.use('/api/users', require('./routes/user'));

module.exports = app;