'use strict'

require('dotenv').config()
const db = process.env.db
const mongoose = require("mongoose")

mongoose.connect(db, (err, res) => {
    if(err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    console.log("Conexión a la base de datos establecida")
})

module.exports = {
    mongoose
}