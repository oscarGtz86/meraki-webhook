/**
 * Routing alert paths
 * @author Oscar Escamilla
 * @date 28.03.2022
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { getAlerts, postAlert, deleteAlert } = require('../controllers/alerts');
const { validateFields, emptyBody } = require('../middlewares/validate-fields');
const { validateSecret } = require('../middlewares/validate-secret');

const router = new Router();

/**
 * GET alerts method
 * @param path
 * @param controllers
 */
router.get('/', [
    check('limit', 'limit is not a number').isNumeric(),
    check('startAt', 'startAt is not a number').isNumeric(),
    validateFields,
], getAlerts);

/**
 * POST alert method
 * @param path
 * @param controllers
 */
router.post('/', [
    emptyBody,
], postAlert);

/**
 * DELETE alert method
 * @param path
 * @param controllers
 */
 router.delete('/:id', [
    validateSecret,
    check('id', 'Not a valid id').isMongoId(),
    validateFields,
], deleteAlert);

module.exports = router;