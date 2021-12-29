'use strict'

require('dotenv').config()
const db = process.env.db
const dbLocalhost = process.env.dbLocalhost
const mongoose = require("mongoose")

//SE CONECTA DOCKER
mongoose.connect(db, (req, res) => {
    if(req) {
        //SE CONECTA AL SERVIDOR LOCALHOST
        mongoose.connect(dbLocalhost, (err, res) => {
            if(err) {
                return console.log(`Error al conectar a la base de datos: ${err}`)
            }
        })
    }
    console.log("Conexión a la base de datos establecida")
})

module.exports = {
    mongoose
}