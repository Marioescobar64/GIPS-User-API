'use strict'

import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    practica: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Practice',
        required: [true, 'La práctica es obligatoria']
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El supervisor es obligatorio']
    },
    comentario: {
        type: String,
        required: [true, 'El comentario es obligatorio'],
        trim: true,
        maxLength: [500, 'El comentario no puede exceder los 500 caracteres']
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatoria']
    }
}, {
    timestamps: true
})

export default mongoose.model('Review', reviewSchema)
