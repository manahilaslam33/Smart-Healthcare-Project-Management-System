const mongoose = require('mongoose');

const projectPlanSchema = new mongoose.Schema({
    scopeInfo: { type: String, required: true },
    scheduleInfo: { type: String, required: true },
    costInfo: { type: String, required: true },
    qualityInfo: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ProjectPlan', projectPlanSchema);