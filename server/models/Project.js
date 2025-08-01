const mongoose = require("mongoose")

const projectSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
}, {timestamps: true})

module.exports = mongoose.model('Project', projectSchema)