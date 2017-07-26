const assert = require('assert');
const app = require('../../src/app');

describe('\'FindTime\' service', () => {
  it('registered the service', () => {
    const service = app.service('findtime');

    assert.ok(service, 'Registered the service');
  });
});
