'use strict'

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductoSchema = Schema({
    nombre: {type: String, unique: true, lowercase: true},
    precio: { type: Number, default: 0},
    categoria: {type: String, enum: ['computador', 'telefono', 'televisor', 'otros']},
    descripcion: String
})

module.exports = mongoose.model('Producto', ProductoSchema)