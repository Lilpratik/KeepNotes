const Note = require('../models/note.models');

// create note 
const createNote = async(req, res) => {

    try {
        
        const { title, content, color } = req.body;

        // validate
        if (!title) {
            return res.status(400).json({
                message: "Title is required!"
            });
        }

        const note = await Note.create({
            userId: req.user._id,
            title,
            content, 
            color
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// get all notes
const getNotes = async(req, res) => {
    try {
        const notes = await Note.find({
            userId: req.user._id
        }).sort({
            isPinned: -1,
            updatedAt: -1,
        });

        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// get single note 
const getSingleNote = async(req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        // validate
        if (!note) {
            return res.status(404).json({
                message: "Not found!"
            });
        }

        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// update note 
const updateNote = async(req, res) => {
    try {
        const { title, content, color, isPinned } = req.body;

        const note = await Note.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found!"
            });
        }

        note.title = title || note.title;
        note.content = content || note.content;
        note.color = color || note.color;

        if(typeof isPinned === "boolean") {
            note.isPinned = isPinned;
        }

        const updatedNote = await note.save();

        res.status(200).json(updatedNote);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Delete note 
const deleteNote = async(req, res) => {
    try {
        
        const note = await Note.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found!"
            });
        }

        await note.deleteOne();

        res.status(200).json({
            message: "Note deleted successfully!"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Toggle pin 
const togglePin = async(req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found!"
            });
        }

        note.isPinned = !note.isPinned;

        await note.save();

        res.status(200).json(note);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createNote,
    getNotes,
    getSingleNote,
    updateNote,
    deleteNote,
    togglePin,
};
