const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    activityName: { type: String, required: true }, // Jaise: Appointment Module, Billing Module, etc.
    assignedTo: { type: String, required: true }, // Jaise: Backend Dev, Frontend Dev, QA Engineer[cite: 1]
    durationWeeks: { type: Number, required: true },
    dependencies: { type: String }, // Predecessor task
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);