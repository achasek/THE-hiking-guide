const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: String,
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    userName: String,
    userAvatar: String,
});

const hikeSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    location: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    pictures: [String],
    comments: [commentSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model('Hike', hikeSchema);