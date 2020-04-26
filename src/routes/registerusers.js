const { Router } = require('express');
const router = Router();

const { registerUser, login } = require('../controllers/registerusers.controller');

router.route('/registeruser')
    .post(registerUser);

router.route('/login')
    .post(login);

module.exports = router;