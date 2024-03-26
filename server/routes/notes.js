const express = require('express');
const router = express.Router();
const { getNotes,getNote,updateNote,createNote,deleteNote } = require('../controllers/notes');
const {requireAuth} = require('../middlewares/requireAuth');

router.use(requireAuth);

router.route('/').get(getNotes).post(createNote);
router.route('/:id').get(getNote).put(updateNote).delete(deleteNote);

module.exports = router;