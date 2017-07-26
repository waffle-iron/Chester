const assert = require('assert');
const app = require('../../src/app');

describe('\'QuickBook\' service', () => {
  it('registered the service', () => {
    const service = app.service('quickbook');

    assert.ok(service, 'Registered the service');
  });
});
