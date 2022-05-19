/**
 * Alerts controller
 * @author Oscar Escamilla
 * @date 28.03.2022
 */

const Alert = require('../models/alert');

/**
 * Find and get alerts
 * @param {number} limit Max number of users returned
 * @param {number} startAt Skip query parameter
 */
const getAlerts = async (req, res, next) => {
    try {
        const { limit, startAt } = req.query; // Get query

        const [total, alerts] = await Promise.all([
            Alert.countDocuments(),
            Alert.find()
                .skip(Number(startAt))
                .limit(Number(limit))
        ]);

        req.logger.info(`Alerts: ${total}`);

        res.status( 200 ).json({
            total,
            alerts
        });
    } catch (error) {
        next( error );
    }
    
}

/**
 * Save alert into database
 * @param {Alert} alert Alert object
 */
const postAlert = async (req, res, next) => {
    try {
        const alert = req.body; // Get alert from body
        req.logger.debug(alert);
        if(alert.sharedSecret !== process.env.SECRET) { // Validate sharedSecret
            req.logger.warn('Invalid secret');
            return res.status(401).json({
                msg: 'Invalid secret'
            });
        }
        req.logger.info(`${alert.deviceSerial} - ${alert.alertType}`);
        let savedAlert = new Alert(alert);
        savedAlert = await savedAlert.save(alert);
        res.status( 201 ).json(savedAlert);
    } catch (error) {
        next(error);
    }
}

/**
 * DELETE alert
 * @param {string} id Mongo _id
 */
const deleteAlert = async (req, res, next) => {
    try {
        const { id } = req.params; // Get id from params
        const alert = await Alert.findByIdAndDelete(id);
        res.status( 200 ).json(alert);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAlerts,
    postAlert,
    deleteAlert,
}