const { Router } = require('express');
const { create, deletePhoto, update, getOne, getAll } = require('../controllers/photos.controller.js');

const router = Router();

router.route('/create')
    .post(create)
router.route('/')
    .get(getAll)
router.route('/:id')
    .put(update)
    .delete(deletePhoto)
    .get(getOne)

module.exports = router;