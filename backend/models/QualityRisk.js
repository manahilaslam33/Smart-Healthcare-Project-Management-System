const mongoose = require('mongoose');

const qualityRiskSchema = new mongoose.Schema({
    moduleType: { type: String, enum: ['Defect', 'Risk'], required: true },
    title: { type: String, required: true }, // Jaise: Critical defect in appointment scheduling[cite: 1]
    severityOrLikelihood: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], required: true },
    assignedToOrImpact: { type: String, required: true }, // QA Engineer ya Impact level
    status: { type: String, default: 'Open' }
}, { timestamps: true });

module.exports = mongoose.model('QualityRisk', qualityRiskSchema);