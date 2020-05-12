const { Router } = require('express');
const {create, deleteComment, update, getOne, getAll } = require('../controllers/comments.controller');

const router = Router();

router.route('/create')
    .post(create)
router.route('/')
    .get(getAll)
router.route('/:id')
    .put(update)
    .delete(deleteComment)
    .get(getOne)

module.exports = router;