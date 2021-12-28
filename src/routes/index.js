'use strict'

const express = require("express")
const productoController = require("../controllers/controllerProducto")
const usuarioController = require("../controllers/controllerUsuario")
const ventasController = require("../controllers/controllerVentas")

const auth = require("../middleware/auth")
const api = express.Router()

api.get("/producto", auth , productoController.getTodosProductos)
api.get("/producto/:productoID", auth, productoController.getProducto)
api.post("/producto", productoController.guardarProducto)
api.put("/producto/:productoID",auth, productoController.updateProducto)
api.delete("/producto/:productoID", auth, productoController.deleteProducto)

api.post("/registrar", usuarioController.registro)
api.post("/login", usuarioController.autenticacion)

api.get("/ventas", ventasController.getVentasTodas)
api.get("/ventas/:productoID", ventasController.getVentas)
api.post("/ventas", ventasController.guardarVentas)

module.exports = api