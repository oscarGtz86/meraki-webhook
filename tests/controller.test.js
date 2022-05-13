/**
 * Test controllers
 * @author Oscar Escamilla
 * @date 21.04.2022
 */

const mockingoose = require('mockingoose');
const User = require('../models/user');
const { getUsers, postUser, putUser, deleteUser } = require('../controller/users');

/**
 * User's array
 */
const usersArray = [
    {
        "name": "Oz 1",
        "email": "mail1@test.com",
        "status": true,
        "password": "123456"
    },
    {
        "name": "OGE",
        "email": "mail2@test.com",
        "status": false,
        "password": "123456"
    },
    {
        "name": "Oz 3",
        "email": "mail3@test.com",
        "status": true,
        "password": "123456"
    }
];

// MongoDB mock functions
mockingoose(User).toReturn(usersArray, 'find');
mockingoose(User).toReturn(usersArray.length, 'countDocuments');
mockingoose(User).toReturn(usersArray[0], 'save');

describe('API endpoints', () => {
    // Test GET method
    test('GET: should return users', async () => {
        const req = { query: { limit: 3, startAt: 0 } }; // Mock query parameters
        const res = { // Mock express Response
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const next = (err) => { console.error(err) };
        
        await getUsers(req, res, next); // Invoke method

        /** Should return 200 **/
        expect(res.status.mock.calls).toEqual([[200]]);

        /** Should return user's array lenght **/
        const [[jsonResponse]] = res.json.mock.calls; // Get response
        expect(jsonResponse.total).toEqual(3);
        
        /** Should return usersArray[0].email **/
        expect(jsonResponse.users[0].email).toEqual(usersArray[0].email);
    });

    test('POST: should insert user', async () => {
        const { name, email, password } = usersArray[0];
        const req = { body: { name, email, password } }; // Mock body parameters
        const res = { // Mock express Response
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const next = (err) => { console.error(err) };
        
        await postUser(req, res, next); // Invoke method

        /** Should return 200 **/
        expect(res.status.mock.calls).toEqual([[201]]);

        /** Should return user inserted **/
        const [[jsonResponse]] = res.json.mock.calls;
        expect(jsonResponse.email).toEqual(usersArray[0].email);
    });

    test('PUT: should update user', async () => {
        const { name, email, password } = usersArray[0];
        const req = {
            body: { name, email, password },
            params: { id: 10 }
        }; // Mock parameters
        const res = { // Mock express Response
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const next = (err) => { console.error(err) };
        
        await putUser(req, res, next); // Invoke method

        /** Should return 200 **/
        expect(res.status.mock.calls).toEqual([[ 200 ]]);
    });

    test('DELETE: should delete user', async () => {
        const req = {
            params: { id: 1 }
        }; // Mock parameters
        const res = { // Mock express Response
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const next = (err) => { console.error(err) };
        
        await deleteUser(req, res, next); // Invoke method

        /** Should return 200 **/
        expect(res.status.mock.calls).toEqual([[ 200 ]]);
    });
 });