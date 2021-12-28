'use strict'

const Usuario = require("../models/modelsUsuario")
const servicio = require("../services")

function registro (req,res) {
    const usuario = new Usuario({
        email: req.body.email,
        nombre: req.body.nombre
    })

    usuario.save((err) => {
        if(err) {
            if(err.message.includes("duplicate key"))
            {
                return res.status(500).send({message: "Usuario ya existe en la base de datos"})
            }
            return res.status(500).send({message: `Error al crear usuario: ${err}`})
        }
        return res.status(200).send({token: servicio.createToken(usuario)})
    })
}

function autenticacion (req,res){
    Usuario.find({email: req.body.email}, (err, usuario) => {
        if(err) return res.status(500).send({message: err})
        if(usuario.length == 0) {
            return res.status(404).send({message: "Usuario no existe en la base de datos"})
        }
        req.usuario = usuario
        res.status(200).send({
            message: "Se ha logueado correctamente",
            token: servicio.createToken(usuario)
        })
    })
}

module.exports = {
    registro,
    autenticacion
}