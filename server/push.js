const fs = require('fs');

const urlsafeBase64 = require('urlsafe-base64');
const vapid = require('./vapid.json');

const webpush = require('web-push');

webpush.setVapidDetails(
    'mailto:luntiromer@gmail.com',
    vapid.publicKey,
    vapid.privateKey
);

let suscripciones = require('./subs-db.json');


module.exports.getKey = () => {
    return urlsafeBase64.decode( vapid.publicKey );
};


module.exports.addSubscripcion = ( suscripcion ) => {

    suscripciones.push( suscripcion );

    fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify( suscripciones ));

};


module.exports.sendPush = ( post ) => { // Recibir post

    //console.log('Mandando PUSHES');

    const notificacionesEnviadas = []; 

    suscripciones.forEach( (suscripcion, i) => {

        const pushProm = webpush.sendNotification( suscripcion , JSON.stringify( post ) ) // Se envia post
            .then( console.log('Notificacion enviada') )
            .catch( err => {

                console.log('Notificacion fallo');
                
                if ( err.statusCode === 410 ) { // GONE, ya no existe
                    suscripciones[i].borrar = true;
                }
            });
        notificacionesEnviadas.push( pushProm );

    });

    Promise.all( notificacionesEnviadas ).then( () => {

        suscripciones = suscripciones.filter( subs => !subs.borrar );

        fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify( suscripciones ));

    });


}