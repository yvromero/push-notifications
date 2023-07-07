const fs = require('fs');

const urlsafeBase64 = require('urlsafe-base64');
const vapid = require('./vapid.json');

const suscripciones = [];


module.exports.getKey = () => {
    return urlsafeBase64.decode( vapid.publicKey );
};


module.exports.addSubscripcion = ( suscripcion ) => {

    suscripciones.push( suscripcion );

    fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify( suscripciones ));

};