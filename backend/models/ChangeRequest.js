const mongoose = require('mongoose');

const changeRequestSchema = new mongoose.Schema({
    changeTitle: { type: String, required: true }, // Jaise: AI Diagnosis Module & Mobile App[cite: 1]
    justification: { type: String, required: true },
    costImpact: { type: Number, required: true }, // Jaise: PKR 800,000[cite: 1]
    scheduleImpactWeeks: { type: Number, required: true }, // Jaise: 3 Weeks[cite: 1]
    approvalStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('ChangeRequest', changeRequestSchema);