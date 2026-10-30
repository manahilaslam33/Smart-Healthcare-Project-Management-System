const express = require('express');
const router = express.Router();
const Requirement = require('../models/Requirement');

// Nayi requirement add karne ka API
router.post('/add-requirement', async (req, res) => {
    try {
        const newReq = new Requirement(req.body);
        const savedReq = await newReq.save();
        res.status(201).json({ message: "Requirement added successfully!", savedReq });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Saari requirements dekhne ka API
router.get('/get-requirements', async (req, res) => {
    try {
        const requirements = await Requirement.find();
        res.status(200).json(requirements);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Requirement status update karne ka API (Approved/Rejected)
router.put('/update-status/:id', async (req, res) => {
    try {
        const updated = await Requirement.findByIdAndUpdate(
            req.params.id, 
            { status: req.body.status }, 
            { new: true }
        );
        res.status(200).json({ message: "Requirement status updated!", updated });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;