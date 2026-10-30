const mongoose = require('mongoose');

const projectCharterSchema = new mongoose.Schema({
    projectName: { type: String, default: "Smart Healthcare Project Management System" },
    objectives: { type: [String], required: true },
    stakeholders: { type: [String], required: true },
    scopeBoundaries: { type: [String], required: true },
    approvedBudget: { type: Number, default: 5000000 }, // PKR 5,000,000[cite: 1]
    deadlineWeeks: { type: Number, default: 16 }, // 16 Weeks[cite: 1]
    status: { type: String, default: 'Initiated' }
}, { timestamps: true });

module.exports = mongoose.model('ProjectCharter', projectCharterSchema);