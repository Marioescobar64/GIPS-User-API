'use strict';

import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    carnet: {
        type: String,
        required: [true, 'El carnet es obligatorio'],
        trim: true,
        maxLength: [50, 'El carnet no puede exceder los 50 caracteres']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        maxLength: [255, 'El nombre no puede exceder los 255 caracteres']
    },
    carrera: {
        type: String,
        required: [true, 'La carrera es obligatoria'],
        trim: true,
        maxLength: [255, 'La carrera no puede exceder los 255 caracteres']
    },
    telefono: {
        type: String,
        trim: true,
        maxLength: [20, 'El teléfono no puede exceder los 20 caracteres']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        trim: true,
        lowercase: true,
        maxLength: [255, 'El correo no puede exceder los 255 caracteres']
    },
    horasRequeridas: {
        type: Number,
        required: [true, 'Las horas requeridas son obligatorias'],
        min: [0, 'Las horas no pueden ser negativas']
    },
    horasAcumuladas: {
        type: Number,
        default: 0,
        min: [0, 'Las horas acumuladas no pueden ser negativas']
    }
}, {
    timestamps: true
});

studentSchema.index({ carnet: 1 });
studentSchema.index({ correo: 1 });
studentSchema.index({ nombre: 1 });
studentSchema.index({ carnet: 1, correo: 1 });

export default mongoose.model('Student', studentSchema);
