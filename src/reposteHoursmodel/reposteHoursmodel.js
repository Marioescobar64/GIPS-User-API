'use strict';

import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
    estudiante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: [true, 'El estudiante es obligatorio']
    },
    horasTotales: {
        type: Number,
        required: [true, 'Las horas totales son obligatorias'],
        min: [0, 'Las horas no pueden ser negativas']
    },
    horasAprobadas: {
        type: Number,
        required: [true, 'Las horas aprobadas son obligatorias'],
        min: [0, 'Las horas no pueden ser negativas']
    },
    horasPendientes: {
        type: Number,
        required: [true, 'Las horas pendientes son obligatorias'],
        min: [0, 'Las horas no pueden ser negativas']
    }
}, {
    timestamps: true
});

progressSchema.index({ estudiante: 1 });
progressSchema.index({ horasTotales: 1 });
progressSchema.index({ horasAprobadas: 1 });
progressSchema.index({ estudiante: 1, horasAprobadas: 1 });

export default mongoose.model('Progress', progressSchema);
