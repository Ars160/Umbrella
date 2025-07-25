const mongoose = require("mongoose")

const projectUserSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true},
    role: { type: String, enum: ['owner', 'member'], default: 'member' },
    joinedAt: { type: Date, default: Date.now }
}, { timestamps: true });

projectUserSchema.index({user: 1, project: 1}, {unique: true})

module.exports = mongoose.model('ProjectUser', projectUserSchema)
