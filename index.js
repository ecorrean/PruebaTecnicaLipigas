'use strict'

require('dotenv').config()
const port = process.env.port
const express = require("express")
const app = express()
const api = require("./src/routes")
require('./src/dbConfig/config')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use("/api", api)

app.listen(port, () => {
    console.log(`Se ha levantado correctamente la API, puerto: ${port}`)
})

module.exports = app