const mongoose = require('mongoose');

const BreakSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Break name is required'],
        minLength: [3, 'Break name must be 3 or more characters']
    },
    description: {
        type: Object
    },
    notes: {
        type: String,
    }
}, {timestamps: true});

const Break = mongoose.model('Break', BreakSchema)
module.exports = Break