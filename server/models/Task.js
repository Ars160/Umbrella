const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    status: {type: String, enum: ['todo', 'inProgress', 'done'], default: 'todo'},
    project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true},
    assignedTo: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true})

module.exports = mongoose.model('Task', taskSchema)