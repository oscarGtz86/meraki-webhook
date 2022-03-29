/**
 * Middleware to validate Secret
 * @author Oscar Escamilla
 * @date 10.02.2022
 */
const { request, response } = require("express");

/**
 * To validate Bearer token
 * @param {string} "authorization" Header that contains secret
 */
const validateSecret = async ( req = request, res = response, next ) => {
    const header = req.headers.authorization;

    // If header is empty or incorrect authentication
    if ( !header || header.indexOf('Bearer ') === -1) {
        console.log('Invalid Header');
        return res.status(401).json({
            msg: 'No authorized'
        });
    }

    try {
        const [, secret] = header.split(' ');
        
        if ( secret !== process.env.SECRET ) { // If incorrect secret
            return res.status(401).json({
                msg: 'No authorized'
            });
        }

        next();

    } catch (error) {
        return res.status( 401 ).json({
            msg: 'No authorized'
        });
    }
}

module.exports = {
    validateSecret,
}