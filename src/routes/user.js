const { Router } = require('express');
const router = Router();
const verifyToken = require('../middlewares/verifyToken');
const verifyPhoto = require('../middlewares/verifyPhotoProfile');
const { createUser, setAvatarProfile,  deleteUser, update, getOne, getAll } = require('../controllers/users.controller');

router.route('/create')
    .post(verifyToken,createUser)
    
router.route('/setImageProfile/:id')
    .post(verifyToken,verifyPhoto,setAvatarProfile)

router.route('/')
    .get(verifyToken,getAll)

router.route('/:id')
    .put(verifyToken,update)
    .get(verifyToken,getOne)
    .delete(verifyToken,deleteUser)

module.exports = router;