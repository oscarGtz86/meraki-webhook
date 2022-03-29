/**
 * Alert's schema
 * @author Oscar Escamilla
 * @date 28.03.2022
 * 
 * Common JSON Parameters
 *
 * ┌──────────────────┬──────────┬────────────────────────────────────────────────────────────────────────┐
 * | Name             | Format   | Description                                                            |
 * ├──────────────────┼──────────┼────────────────────────────────────────────────────────────────────────┤
 * | alertData        | object   | Object of unique parameters for each alert                             |
 * ├──────────────────┼──────────┼────────────────────────────────────────────────────────────────────────┤
 * | alertId          | string   | ID for this alert message                                              |
 * ├──────────────────┼──────────┼────────────────────────────────────────────────────────────────────────┤
 * | alertType        | string   | Type of alert (“Network usage alert”, “Settings changed”, etc.)        |
 * ├──────────────────┼──────────┼────────────────────────────────────────────────────────────────────────┤
 * | networkId        | string   | ID for the Meraki network                                              |
 * ├──────────────────┼──────────┼────────────────────────────────────────────────────────────────────────┤
 * | networkName      | string   | Name for the Meraki network                                            |
 * ├──────────────────┼──────────┼────────────────────────────────────────────────────────────────────────┤
 * | networkUrl       | string   | URL of the Meraki Dashboard network                                    |
 * ├──────────────────┼──────────┼────────────────────────────────────────────────────────────────────────┤
 * | occurredAt       | UTC      | Timestamp of the alert                                                 |
 * ├──────────────────┼──────────┼────────────────────────────────────────────────────────────────────────┤
 * | organizationId   | string   | ID of the Meraki organization                                          |
 * ├──────────────────┼──────────┼────────────────────────────────────────────────────────────────────────┤
 * | organizationName | string   | Name of the Meraki organization                                        |
 * ├──────────────────┼──────────┼────────────────────────────────────────────────────────────────────────┤
 * | organizationUrl  | string   | URL of the Meraki Dashboard organization                               |
 * ├──────────────────┼──────────┼────────────────────────────────────────────────────────────────────────┤
 * | sentAt           | UTC      | Timestamp of the sent message                                          |
 * ├──────────────────┼──────────┼────────────────────────────────────────────────────────────────────────┤
 * | sharedSecret     | string   | User defined secret to be validated by the webhook receiver (optional) |
 * ├──────────────────┼──────────┼────────────────────────────────────────────────────────────────────────┤
 * | version          | float    | Current version of webhook format                                      |
 * └──────────────────┴──────────┴────────────────────────────────────────────────────────────────────────┘
 *
 * Source:
 * https://developer.cisco.com/meraki/webhooks/#!introduction/common-json-parameters
 * https://developer.cisco.com/meraki/webhooks/#!webhook-sample-alerts
 */

const { Schema, model } = require('mongoose');

const AlertSchema = Schema({
    alertData: {
        type: Object
    },
    alertId: {
        type: String
    },
    alertType: {
        type: String
    },
    networkId: {
        type: String
    },
    networkName: {
        type: String
    },
    networkUrl: {
        type: String
    },
    occurredAt: {
        type: String
    },
    organizationId: {
        type: String
    },
    organizationName: {
        type: String
    },
    organizationUrl: {
        type: String
    },
    sentAt: {
        type: String
    },
    sharedSecret: {
        type: String
    },
    version: {
        type: Number
    },
    deviceSerial: {
        type: String
    },
    deviceMac: {
        type: String
    },
    deviceName: {
        type: String
    },    
    deviceUrl: {
        type: String
    },
    deviceTags: {
        type: Array
    },
    deviceModel: {
        type: String
    },
});

module.exports = model('Alerts', AlertSchema);