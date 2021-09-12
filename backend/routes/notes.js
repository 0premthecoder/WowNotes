const express = require('express')
const Notes = require('../models/Notes')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser.js')

// ROUTE 1: Get All Notes Using POST: api/notes/getuser. Login Required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (e) {
        console.error(e.message)
        res.status(500).send(" Error Occured")
    }
})
// ROUTE 2: Add Notes Using POST: api/notes/addnote. Login Required
router.post('/addnote', [// Checking Valid Value 
    body('title', 'Title cannot be Less than 2 characters').isLength({ min: 2 }),
    body('description', 'Description cannot be Less than 5 characters').isLength({ min: 5 }),
], fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        let success = false
        // If err then send json
        if (!errors.isEmpty()) {
            success = false
            return res.status(400).json({success ,errors: errors.array() });
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const savednote = await note.save()
        success = true
        res.json({success,savednote})
    } catch (e) {
        console.error(e.message)
        res.status(500).send(" Error Occured")
    }
})


// ROUTE 3: UPDATING A note using put. loging required
router.put('/updatenote/:id', [// Checking Valid Value 
    body('title', 'Title cannot be Less than 2 characters').isLength({ min: 2 }),
    body('description', 'Description cannot be Less than 5 characters').isLength({ min: 5 }),
], fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        let note = await Notes.findById(req.params.id)
        if (!note) { return req.status(400).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return req.status(400).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (e) {
        console.error(e.message)
        res.status(500).send(" Error Occured")
    }
})

// ROUTE 4: Deleting A note using delete. login required
router.delete('/deletenote/:id', [
], fetchUser, async (req, res) => {
    try {

        // find the note to be deleted and delete it ahead
        let note = await Notes.findById(req.params.id)
        if (!note) { return req.status(400).send("Not Found") }

        // Allow detection only if user owns this notes
        if (note.user.toString() !== req.user.id) {
            return req.status(402).send("Not Allowed")
        }

        // delete it

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note Has Been Trashed" })
    } catch (e) {
        console.error(e.message)
        res.status(500).send("Internal Server Error Occured")
    }
})

module.exports = router