const fs = require('fs');

const urlsafeBase64 = require('urlsafe-base64');
const vapid = require('./vapid.json');

const webpush = require('web-push');

webpush.setVapidDetails(
    'mailto:luntiromer@gmail.com',
    vapid.publicKey,
    vapid.privateKey
);

const suscripciones = [];


module.exports.getKey = () => {
    return urlsafeBase64.decode( vapid.publicKey );
};


module.exports.addSubscripcion = ( suscripcion ) => {

    suscripciones.push( suscripcion );

    fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify( suscripciones ));

};