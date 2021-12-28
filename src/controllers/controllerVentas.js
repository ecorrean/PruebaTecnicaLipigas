'use strict'

const Producto = require("../models/modelsProducto")
const Ventas = require("../models/modelsVentas")

function guardarVentas(req,res){  
    let ventas = new Ventas()
    ventas.productoID = req.body.productoID
    ventas.cantidadVendida = req.body.cantidadVendida
    ventas.montoVendido = req.body.montoVendido

    let productoID = ventas.productoID

    Producto.findById(productoID, (err, producto) => {
        if(err) {
            return res.status(500).send({message: `Error al realizar petición: ${err}`})
        }
        if(!producto) {
            return res.status(404).send({message: "Producto no existe en la base de datos"})
        }

        ventas.save((err, ventaStored) => {
            if(err) {
                if(err.message.includes("validation failed"))
                {
                    return res.status(500).send({message: "El formato de uno de los campos es incorrecto",error: `${err.message}`})
                }
                return res.status(500).send({message: `Error al guardar venta en la base de datos: ${err.message}`})
            }
            res.status(200).send({venta: ventaStored})
        })
    })
}

function getVentasTodas(req,res){
    Ventas.find({}, (err,ventas) => {   
        if(err) {
            return res.status(500).send({message: `Error al realizar petición: ${err}`})
        }
        if(ventas.length == 0) {
            return res.status(404).send({message: "No existen ventas en la base de datos"})
        }
        res.status(200).send({ventas})
    }) 
}

function getVentas(req, res){
    let productoID = req.params.productoID

    Ventas.find({productoID: productoID}, (err, ventas) => {
        if(err) {
            return res.status(500).send({message: `Error al realizar petición: ${err}`})
        }
        if(ventas.length == 0) {
            return res.status(404).send({message: "No existen ventas para el producto en la base de datos"})
        }

        const arrMontoVendido = []
        const arrCantidadVendido = []
        ventas.forEach(function (venta){
            arrMontoVendido.push(venta.montoVendido);
            arrCantidadVendido.push(venta.cantidadVendida);
        });

        let totalMontoVendido = arrMontoVendido.reduce((a, b) => a + b, 0);
        let totalCantidadVendida = arrCantidadVendido.reduce((a, b) => a + b, 0);

        res.status(200).send({ProductoID: productoID,MontoVendido: totalMontoVendido, CantidadVendida: totalCantidadVendida})
    })
}

module.exports ={
    guardarVentas,
    getVentasTodas,
    getVentas
}