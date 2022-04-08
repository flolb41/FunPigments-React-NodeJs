/* Import de Mongoose */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/* Création du schéma du model de produit */
const postSchema = new mongoose.Schema({
    id: { type: String },
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    colomatos: { type: Schema.Types.ObjectId, ref: 'colomatos', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

});

/* Export du module */
module.exports = mongoose.model('avis', postSchema);