const express = require('express');
const Note = require("../models/Note");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// fetch all notes of a user
router.get('/fetchalldata', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })

        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

// create notes
router.post('/addNotes', fetchuser, [
    body('title', 'Enter a title').isLength({ min: 3 }),
    body('description', 'Enter description').isLength({ min: 6 }),
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    try {
        const { title, description, tag } = req.body;
        const note = new Note({ title, description, tag, user: req.user.id })
        const saveNote = await note.save();

        res.json(saveNote);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }

})

// update note of user

router.put('/updateNotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        const checkNote = await Note.findById(req.params.id);
        if (!checkNote) {
            return res.status(404).send("Note not found");
        }
        if (checkNote.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorised");
        }

        const result = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

        res.json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }


})


// delete notes
router.delete('/deleteNote/:id', fetchuser, async (req, res) => {

    try {
        const checkNote = await Note.findById(req.params.id);
        if (!checkNote) { return res.status(404).send("Note not found") }

        if (checkNote.user.toString() !== req.user.id) { return res.status(401).send("Unauthorised") }

        const result = await Note.findByIdAndDelete(req.params.id);

        res.json({ "Success": "Note delete successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }

})

module.exports = router;