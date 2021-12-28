'use strict'

const Producto = require("../models/modelsProducto")

function getProducto(req, res){
    let productoID = req.params.productoID

    Producto.findById(productoID, (err, producto) => {
        if(err) {
            return res.status(500).send({message: `Error al realizar petición: ${err}`})
        }
        if(!producto) {
            return res.status(404).send({message: "Producto no existe en la base de datos"})
        }

        res.status(200).send({producto})
    })
}

function getTodosProductos(req,res){
    Producto.find({}, (err,productos) => {   
        if(err) {
            return res.status(500).send({message: `Error al realizar petición: ${err}`})
        }
        if(productos.length == 0) {
            return res.status(404).send({message: "No existen productos en la base de datos"})
        }
        res.status(200).send({productos})
    }) 
}

function guardarProducto(req,res){
    let producto = new Producto()
    producto.nombre = req.body.nombre
    producto.precio = req.body.precio
    producto.categoria = req.body.categoria
    producto.descripcion = req.body.descripcion

    producto.save((err, productoStored) => {
        if(err) {
            if(err.message.includes("duplicate key"))
            {
                return res.status(500).send({message: "Producto ya existe en la base de datos"})
            }
            if(err.message.includes("validation failed"))
            {
                return res.status(500).send({message: "El formato de uno de los campos es incorrecto",error: `${err.message}`})
            }
            return res.status(500).send({message: `Error al guardar producto en la base de datos: ${err.message}`})
        }
        res.status(200).send({producto: productoStored})
    })
}

function updateProducto(req, res){
    let productoID = req.params.productoID
    let update = req.body

    Producto.findByIdAndUpdate(productoID, update, (err, productoUpdate) => {
        if(err) {
            return res.status(500).send({message: `Error al actualizar producto en la base de datos: ${err}`})
        }
        if(!productoUpdate) {
            return res.status(404).send({message: "Producto no existe en la base de datos"})
        }
        res.status(200).send({message: "Producto actualizado correctamente"})
    })
}

function deleteProducto(req, res){
    let productoID = req.params.productoID

    Producto.findById(productoID, (err, producto) => {
        if(err) {
            return res.status(500).send({message: `Error al borrar producto de la base de datos: ${err}`})
        }
        if(!producto) {
            return res.status(404).send({message: "Producto no existe en la base de datos"})
        }
        producto.remove((err) => {
            if(err) {
                return res.status(500).send({message: `Error al borrar producto de la base de datos: ${err}`})
            }
            res.status(200).send({message: "Producto ha sido eliminado correctamente"})
        })
    })
}

module.exports ={
    getProducto,
    getTodosProductos,
    guardarProducto,
    updateProducto,
    deleteProducto
}