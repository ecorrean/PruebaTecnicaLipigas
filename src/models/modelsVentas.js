'use strict'

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const VentasSchema = Schema({
    productoID: String,
    cantidadVendida: Number,
    montoVendido: Number
})

module.exports = mongoose.model('Ventas', VentasSchema)