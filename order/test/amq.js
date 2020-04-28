const amqp = require('amqp');
const chai = require('chai');

const should = chai.should();
const amqpmock = require('amqp-mock');
const debug = require('../src/helpers/debug');

describe('amqp-mock', () => {
  describe('#publish', () => {
    it('should publish messages with different exchanges', (done) => {
      const scope = amqpmock({ url: process.env.CLOUDAMQP_URL })
        .exchange('nodejs', { type: 'topic' })
        .publish('orders', 'Hello');

      const connection = amqp.createConnection({ url: process.env.CLOUDAMQP_URL });
      connection.on('ready', () => {
        connection.exchange('nodejs', { type: 'direct' }, (exchange) => {
          connection.queue('', (queue) => {
            queue.bind(exchange.name, 'nodejs');

            queue.subscribe({}, (message) => {
              debug(message.data);
            });
          });
        });
      });

      connection.on('error', (err) => {
        throw err;
      });

      setTimeout(() => {
        // This will assert that all specified calls on the scope were performed.
        scope.done();
      }, 10);
    });
  });
});
