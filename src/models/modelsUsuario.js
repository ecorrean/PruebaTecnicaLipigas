'use strict'

const mongoose = require("mongoose")
const Schema = mongoose.Schema

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UsuarioSchema = Schema({
    email: {type: String, unique: true, lowercase: true, validate: [validateEmail, 'Favor ingrese un email valido']},
    nombre: String,
    signupDate: {type: Date, default: Date.now()},
    lastLogin: Date
})

module.exports = mongoose.model('Usuario', UsuarioSchema)