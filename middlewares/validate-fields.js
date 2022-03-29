/**
 * Implement validator middlewares
 * @author Oscar Escamilla
 * @date 02.02.2022
 */
const { request, response } = require("express");
const { validationResult } = require("express-validator");

/**
 * 
 * @param {Request} req Express request
 * @param {Response} res Express response
 * @param {function} next Express next function
 * @returns JSON with validation errors
 */
const validateFields = (req = request, res = response, next) => {
    const errors = validationResult(req); // Extracts the validation errors
    if ( !errors.isEmpty() ) { // If errors exists then return them
        return res.status( 400 ).json( errors );
    }
    next();
}

/**
 * Validate if body is empty
 * @param {Object} req.body
 * @returns JSON response
 */
const emptyBody = (req = request, res = response, next) => {
    if(Object.keys(req.body).length === 0) { // If body is empty
        return res.status( 400 ).json({
            "errors": [
                {
                    "msg": "body is required",
                    "param": "body",
                    "location": "body"
                }
            ]
        })
    }
    next();
}

module.exports = {
    validateFields,
    emptyBody,
}