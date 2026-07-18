'use strict';

import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    practica: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Practice',
        required: [true, 'La práctica es obligatoria']
    },
    archivo: {
        type: String,
        required: [true, 'El archivo es obligatorio'],
        trim: true,
        maxLength: [255, 'El nombre del archivo no puede exceder los 255 caracteres']
    },
    descripcion: {
        type: String,
        trim: true,
        maxLength: [500, 'La descripción no puede exceder los 500 caracteres']
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatoria']
    }
}, {
    timestamps: true
});

documentSchema.index({ practica: 1 });
documentSchema.index({ archivo: 1 });
documentSchema.index({ fecha: 1 });
documentSchema.index({ practica: 1, fecha: 1 });

export default mongoose.model('Document', documentSchema);
