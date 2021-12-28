'use strict'

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UsuarioSchema = Schema({
    email: {type: String, unique: true, lowercase: true},
    nombre: String,
    signupDate: {type: Date, default: Date.now()},
    lastLogin: Date
})

module.exports = mongoose.model('Usuario', UsuarioSchema)