const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');

// Nayi activity add karne ka API
router.post('/add-activity', async (req, res) => {
    try {
        const newActivity = new Activity(req.body);
        const savedActivity = await newActivity.save();
        res.status(201).json({ message: "Activity added successfully!", savedActivity });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Saari activities dekhne ka API
router.get('/get-activities', async (req, res) => {
    try {
        const activities = await Activity.find();
        res.status(200).json(activities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;