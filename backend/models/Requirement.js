const mongoose = require('mongoose');

const requirementSchema = new mongoose.Schema({
    requirementName: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    source: { type: String, default: 'Hospital Management' } // Jaise case study mein extra requirements aayi hain[cite: 1]
}, { timestamps: true });

module.exports = mongoose.model('Requirement', requirementSchema);