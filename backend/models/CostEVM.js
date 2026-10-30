const mongoose = require('mongoose');

const costEvmSchema = new mongoose.Schema({
    projectName: { type: String, default: "Smart Healthcare Project Management System" },
    plannedValuePV: { type: Number, required: true }, // PV: Planned Value
    earnedValueEV: { type: Number, required: true },   // EV: Earned Value
    actualCostAC: { type: Number, required: true },    // AC: Actual Cost
    approvedBudget: { type: Number, default: 5000000 }  // Base budget PKR 5,000,000[cite: 1]
}, { timestamps: true });

module.exports = mongoose.model('CostEVM', costEvmSchema);