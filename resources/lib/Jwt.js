module.exports = Object.create( Object.assign( { }, require('../../lib/MyObject'), {

    Jws: require('jws'),

    makeToken( obj ) {
        return new Promise( ( resolve, reject ) =>
            this.Jws.createSign( {
                header: { "alg": "HS256", "typ": "JWT" },
                payload: JSON.stringify( obj ),
                privateKey: process.env.JWS_SECRET
            } )
            .on( 'done', resolve )
            .on( 'error', reject )
        )
    },

    parseToken( token ) {
        const defaultUser = { roles: [ ] }
        return new Promise( ( resolve, reject ) => {
            if( ! token ) return resolve( defaultUser )
    
            this.Jws.createVerify( {
                algorithm: "HS256",
                key: process.env.JWS_SECRET,
                signature: token,
            } ).on( 'done', ( verified, obj ) => {
                if( ! verified ) return resolve( defaultUser )
                resolve( obj.payload )
            } ).on( 'error', reject )
        } )
    }

} ), { } )
