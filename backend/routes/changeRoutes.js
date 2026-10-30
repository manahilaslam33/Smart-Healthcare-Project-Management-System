const express = require('express');
const router = express.Router();
const ChangeRequest = require('../models/ChangeRequest');

// Naya Change Request add karne ka API
router.post('/add-change', async (req, res) => {
    try {
        const newChange = new ChangeRequest(req.body);
        const savedChange = await newChange.save();
        res.status(201).json({ message: "Change request recorded successfully!", savedChange });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Saare change requests dekhne ka API
router.get('/get-changes', async (req, res) => {
    try {
        const changes = await ChangeRequest.find();
        res.status(200).json(changes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;