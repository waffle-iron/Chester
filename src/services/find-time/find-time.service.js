// Initializes the `FindTime` service on path `/findtime`
const createService = require('./find-time.class.js');
const hooks = require('./find-time.hooks');
const filters = require('./find-time.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'find-time',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/findtime', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('findtime');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
