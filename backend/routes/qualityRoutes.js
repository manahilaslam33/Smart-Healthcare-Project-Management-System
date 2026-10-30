const express = require('express');
const router = express.Router();
const QualityRisk = require('../models/QualityRisk');

// Defect ya Risk add karne ka API
router.post('/add-item', async (req, res) => {
    try {
        const newItem = new QualityRisk(req.body);
        const savedItem = await newItem.save();
        res.status(201).json({ message: "Quality defect or risk recorded successfully!", savedItem });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Saare defects aur risks dekhne ka API
router.get('/get-items', async (req, res) => {
    try {
        const items = await QualityRisk.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;