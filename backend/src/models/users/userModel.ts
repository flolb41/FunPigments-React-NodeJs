import mongoose from 'mongoose';
const uniVal = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    id: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    thumbnail: { type: String },
    city: { type: String },
    isAdmin: { type: Boolean },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

userSchema.plugin(uniVal);
module.exports = mongoose.model('user', userSchema);