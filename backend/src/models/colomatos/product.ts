/* Import de Mongoose */
import mongoose from 'mongoose';

/* Création du schema du model de product */
const productSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String, required: true },
    photo: { type: String, required: true },
    brand: { type: String, required: true },
    color: { type: String, required: true },
    quantity: { type: Number, required: true },
    prodType: {
        type: Boolean, enum: ['crayon', 'livre', 'feutre', 'aquarelle', 'pastel', 'paillette', 'feuille', 'peinture', 'encre', 'autre'],
        required: true
    },
    youtubeUrl: { type: String, required: true },
    amazonUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

});

/* Export du module */
module.exports = mongoose.model('product', productSchema);