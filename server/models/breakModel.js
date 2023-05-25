const mongoose = require('mongoose');

const BreakSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Break name is required'],
        minLength: [3, 'Break name must be 3 or more characters']
    },
    temperature: {
        type: Number,
        required: [true, "Temperature is required!"]
    },
    waveHeight: {
        type: Number,
        required: [true, "Wave height is required!"]
    },
    windDirection: {
        type: String,
        required: [true, "Wind Direction is required!"]
    },
    notes: {
        type: String,
        required: [false]
    }
}, { timestamps: true });

const Break = mongoose.model('Break', BreakSchema)
module.exports = Break