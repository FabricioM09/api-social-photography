const { Router } = require('express');
const router = Router();

const { registerUser } = require('../controllers/registerusers.controller');

router.route('/registeruser')
    .post(registerUser);

module.exports = router;