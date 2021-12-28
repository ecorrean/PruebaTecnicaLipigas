'use strict'

require('dotenv').config()
const SECRET_TOKEN = process.env.SECRET_TOKEN
const jwt = require("jwt-simple")
const moment = require("moment")

function createToken (usuario){
    const payload = {
        sub: usuario._id,
        iat: moment().unix(),
        ext: moment().add(1, 'h').unix(),
    }
    return jwt.encode(payload, SECRET_TOKEN)
}

function decodeToken (token){
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, SECRET_TOKEN)
            if(payload.ext <= moment().unix()){
                reject({
                    status: 401,
                    message: "El token ha expirado"
                })
            }
            else
            {
                resolve(payload.sub)
            }
        }
        catch(err){
            reject({
                status: 500,
                message: "Token invalido"
            })
        }
    })

    return decoded
}

module.exports = {
    createToken,
    decodeToken
}