/* Import de Mongoose */
import mongoose from 'mongoose';

/* Création du schema du model de product */
const defiSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String, required: true },
    photo: { type: String, required: true },
    content: { type: String, required: true }, 
    url: { type: String, required: true },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

});

/* Export du module */
module.exports = mongoose.model('defi', defiSchema);