const express = require('express');
const router = express.Router();

const protect = require('../middlewares/auth.middleware');


const {
    createNote,
    getNotes,
    getSingleNote,
    updateNote,
    deleteNote,
    togglePin
} = require('../controllers/note.controller');

// create note
router.post('/', protect, createNote);

// get all notes
router.get('/', protect, getNotes);

// get single note 
router.get('/:id', protect, getSingleNote);

// update note 
router.put('/:id', protect, updateNote);

// delete note 
router.delete('/:id', protect, deleteNote);

// toggle pin 
router.patch('/:id', protect, togglePin);

module.exports = router;