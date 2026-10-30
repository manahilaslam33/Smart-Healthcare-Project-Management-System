const express = require('express');
const router = express.Router();
const ProjectPlan = require('../models/ProjectPlan');

// Project Plan save karne ka API
router.post('/create-plan', async (req, res) => {
    try {
        const newPlan = new ProjectPlan(req.body);
        const savedPlan = await newPlan.save();
        res.status(201).json({ message: "Project Management Plan created successfully!", savedPlan });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Project Plan get karne ka API
router.get('/get-plan', async (req, res) => {
    try {
        const plan = await ProjectPlan.findOne();
        res.status(200).json(plan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;