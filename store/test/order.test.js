const mongoose = require('mongoose');

const dbHandler = require('./db-handler');
const orderController = require('../src/controllers/orderController');
const order = require('../src/models');

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

/**
 * Order test suite.
 */
describe('order ', () => {

    /**
     * Tests that a valid product can be created through the order controller without throwing any errors.
     */
    it('can be created correctly', async () => {
        expect(async () => await orderController.create(orderMock))
            .not
            .toThrow();
    });
});

/**
 * Complete order example.
 */
const orderMock = {
    name: 'test',
    email: 'test@email.com'
};