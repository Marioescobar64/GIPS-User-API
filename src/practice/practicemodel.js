'use strict';

import mongoose from 'mongoose';

const practiceSchema = new mongoose.Schema({
    estudiante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: [true, 'El estudiante es obligatorio']
    },
    empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: [true, 'La empresa es obligatoria']
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatoria']
    },
    horas: {
        type: Number,
        required: [true, 'Las horas son obligatorias'],
        min: [0, 'Las horas no pueden ser negativas']
    },
    actividades: {
        type: String,
        required: [true, 'Las actividades son obligatorias'],
        trim: true,
        maxLength: [500, 'Las actividades no pueden exceder los 500 caracteres']
    },
    estado: {
        type: String,
        required: [true, 'El estado es obligatorio'],
        enum: {
            values: ['pendiente', 'aprobada', 'rechazada'],
            message: '{VALUE} no es un estado válido'
        },
        default: 'pendiente'
    },
    comentarios: {
        type: String,
        trim: true,
        maxLength: [500, 'Los comentarios no pueden exceder los 500 caracteres']
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

practiceSchema.index({ estudiante: 1 });
practiceSchema.index({ empresa: 1 });
practiceSchema.index({ estado: 1 });
practiceSchema.index({ fecha: 1 });
practiceSchema.index({ estudiante: 1, estado: 1 });

export default mongoose.model('Practice', practiceSchema);
