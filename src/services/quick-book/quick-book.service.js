// Initializes the `QuickBook` service on path `/quickbook`
const createService = require('./quick-book.class.js');
const hooks = require('./quick-book.hooks');
const filters = require('./quick-book.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'quick-book',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/quickbook', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('quickbook');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
