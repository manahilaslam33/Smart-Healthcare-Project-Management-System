const express = require('express');
const router = express.Router();
const ProjectCharter = require('../models/ProjectCharter');

// Project Charter save karne ka API Route (updated path to match api.js)
router.post('/save-charter', async (req, res) => {
    try {
        let charter = await ProjectCharter.findOne();
        if (charter) {
            charter = await ProjectCharter.findOneAndUpdate({}, req.body, { new: true });
        } else {
            charter = new ProjectCharter(req.body);
            await charter.save();
        }
        res.status(200).json({ message: "Project Charter saved successfully!", charter });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Project Charter get karne ka API Route
router.get('/get-charter', async (req, res) => {
    try {
        const charter = await ProjectCharter.findOne();
        res.status(200).json(charter);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;