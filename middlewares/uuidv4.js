/**
 * UUID v4 generator
 * @author Oscar Escamilla
 * @date 28.04.2022
 */
const crypto = require('crypto');

module.exports = (req, res, next) => {
    req.uuid = crypto.randomUUID(); // Set UUID v4
    // Inyect uuid into logger
    req.logger = {
        info: (message) =>  req.winston.info(
            `[${req.uuid}] - ${typeof message === 'object' ?JSON.stringify(message) : message}`),
        warn: (message) =>  req.winston.warn(
            `[${req.uuid}] - ${typeof message === 'object' ? JSON.stringify(message) : message}`),
        error: (message) => req.winston.error(
            `[${req.uuid}] - ${typeof message === 'object' ? JSON.stringify(message) : message}`),
        debug: (message) => req.winston.debug(
            `[${req.uuid}] - ${typeof message === 'object' ? JSON.stringify(message) : message}`),
    };

    next();
}