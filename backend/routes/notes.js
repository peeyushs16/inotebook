const express = require('express');
const Note = require("../models/Note");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

router.get('/fetchalldata', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })

        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

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
module.exports = router;