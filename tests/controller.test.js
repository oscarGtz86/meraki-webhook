/**
 * Test controllers
 * @author Oscar Escamilla
 * @date 21.04.2022
 */

const mockingoose = require('mockingoose');
const Alert = require('../models/alert');
const { getAlerts, postAlert, deleteAlert } = require('../controllers/alerts');
require('dotenv').config();

/**
 * Alert array
 */
const alerts = [
    {
        "version": "0.1",
        "sharedSecret": process.env.SECRET,
        "sentAt": "2021-10-07T08:42:00.916330Z",
        "organizationId": "2930418",
        "organizationName": "My organization",
        "organizationUrl": "https://dashboard.meraki.com/o/VjjsAd/manage/organization/overview",
        "networkId": "N_24329156",
        "networkName": "Main Office",
        "networkUrl": "https://n1.meraki.com/n/manage/nodes/list",
        "networkTags": [],
        "deviceSerial": "Q234-ABCD-5678",
        "deviceMac": "00:11:22:33:44:55",
        "deviceName": "My switch",
        "deviceUrl": "https://n1.meraki.com/n/manage/nodes/new_list/000000000000",
        "deviceTags": [
            "tag1",
            "tag2"
        ],
        "deviceModel": "MS",
        "alertId": "0000000000000000",
        "alertType": "Uplink status changed",
        "alertTypeId": "failover_event",
        "alertLevel": "warning",
        "occurredAt": "2018-02-11T00:00:00.123450Z",
        "alertData": {
            "uplink": "0"
        }
    },
    {
        "version": "0.1",
        "sharedSecret": process.env.SECRET,
        "sentAt": "2021-10-07T08:42:00.916330Z",
        "organizationId": "2930418",
        "organizationName": "My organization",
        "organizationUrl": "https://dashboard.meraki.com/o/VjjsAd/manage/organization/overview",
        "networkId": "N_24329156",
        "networkName": "Main Office",
        "networkUrl": "https://n1.meraki.com/n/manage/nodes/list",
        "networkTags": [],
        "deviceSerial": "Q234-ABCD-5678",
        "deviceMac": "00:11:22:33:44:55",
        "deviceName": "My switch",
        "deviceUrl": "https://n1.meraki.com/n/manage/nodes/new_list/000000000000",
        "deviceTags": [
            "tag1",
            "tag2"
        ],
        "deviceModel": "MS",
        "alertId": "0000000000000000",
        "alertType": "Uplink status changed",
        "alertTypeId": "failover_event",
        "alertLevel": "warning",
        "occurredAt": "2018-02-11T00:00:00.123450Z",
        "alertData": {
            "uplink": "0"
        }
    }
]

// MongoDB mock functions
mockingoose(Alert).toReturn(alerts, 'find');
mockingoose(Alert).toReturn(alerts.length, 'countDocuments');
mockingoose(Alert).toReturn(alerts[0], 'save');

describe('Webhook endpoints', () => {
    // Test GET alerts
    describe('GET alerts', () => {
        test('GET: should return 200 status code', async () => {
            const res = await get();
            /** Should return 200 **/
            expect(res.status.mock.calls).toEqual([[200]]);
        });

        test('GET: should return alert array lenght', async () => {
            const res = await get();

            /** Should return alert array lenght **/
            const [[jsonResponse]] = res.json.mock.calls; // Get response
            expect(jsonResponse.total).toEqual(2);
        });

        test('GET: should return deviceSerial', async () => {
            const res = await get();

            /** Should return alert array lenght **/
            const [[jsonResponse]] = res.json.mock.calls; // Get response
            
            /** Should return deviceSerial **/
            expect(jsonResponse.alerts[0].deviceSerial).toEqual(alerts[0].deviceSerial);
        });
    });

    describe('POST alert', () => {
        // POST alert
        test('POST: should insert alert', async () => {
            const req = { // Mock request
                body: alerts[0],
                logger: {
                    debug: console.log,
                    info: console.log,
                }
            };
            const res = { // Mock express Response
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            const next = (err) => { console.error(err) };
            
            await postAlert(req, res, next); // Invoke method

            /** Should return 201 **/
            expect(res.status.mock.calls).toEqual([[201]]);

            /** Should return deviceSerial **/
            const [[jsonResponse]] = res.json.mock.calls;
            expect(jsonResponse.deviceSerial).toEqual(alerts[0].deviceSerial);
        });
    });
 });

/**
 * API GET method returns alerts
 * @returns response
 */
const get = async () => {
    const req = { // Mock Request
        query: { limit: 3, startAt: 0 },
        logger: { info: console.log }
    };
    const res = { // Mock express Response
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }
    // Mock next function
    const next = (err) => { console.error(err) };
    
    await getAlerts(req, res, next); // Invoke method

    return res;
}