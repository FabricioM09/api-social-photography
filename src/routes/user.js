const { Router } = require('express');
const router = Router();

const { createUser, setAvatarProfile,  deleteUser, update, getUser, getAllUser } = require('../controllers/users.controller');

router.route('/create')
    .post(createUser)
    //.get(getAllUser)
router.route('/setImageProfile/:id')
    .post(setAvatarProfile)

router.route('/:id')
    .put(update)
//     .get(getUser)

module.exports = router;