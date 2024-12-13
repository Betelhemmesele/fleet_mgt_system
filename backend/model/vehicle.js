const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, required: true, enum: ['Active', 'Inactive', 'Under Maintenance'], default: 'Active' },
    lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
