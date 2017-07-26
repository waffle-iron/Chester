const assert = require('assert');
const app = require('../../src/app');

describe('\'Bookings\' service', () => {
  it('registered the service', () => {
    const service = app.service('y');

    assert.ok(service, 'Registered the service');
  });
});
