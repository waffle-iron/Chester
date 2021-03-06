// Initializes the `Resources` service on path `/resources`
const createService = require('feathers-knex');
const createModel = require('../../models/resources.model');
const hooks = require('./resources.hooks');
const filters = require('./resources.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'resources',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/resources', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('resources');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
