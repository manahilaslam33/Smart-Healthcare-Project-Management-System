const express = require('express');
const router = express.Router();

const Charter = require('../models/ProjectCharter'); // Agar pehle banaya hai
const Requirement = require('../models/Requirement');
const ChangeRequest = require('../models/ChangeRequest');
const Activity = require('../models/Activity');
const CostEVM = require('../models/CostEVM');
const QualityRisk = require('../models/QualityRisk');

// Complete Project Master Summary Report API
router.get('/master-report', async (req, res) => {
    try {
        const requirements = await Requirement.find();
        const changes = await ChangeRequest.find();
        const activities = await Activity.find();
        const evmRecords = await CostEVM.find();
        const qualityRisks = await QualityRisk.find();

        res.status(200).json({
            projectName: "Smart Healthcare Project Management System",
            totalRequirements: requirements.length,
            totalChangeRequests: changes.length,
            totalActivities: activities.length,
            latestEVM: evmRecords[evmRecords.length - 1] || "No EVM data yet",
            totalQualityRisks: qualityRisks.length,
            requirements,
            changes,
            activities,
            qualityRisks
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;