const { Router } = require('express');
const { create, deletePhoto, update, getOne, getAll, like, removeLike } = require('../controllers/photos.controller.js');

const router = Router();

router.route('/create')
    .post(create)
router.route('/')
    .get(getAll)
    .post(like)
router.route('/removelike')
    .post(removeLike)
router.route('/:id')
    .put(update)
    .delete(deletePhoto)
    .get(getOne)

module.exports = router;