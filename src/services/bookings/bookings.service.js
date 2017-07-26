// Initializes the `Bookings` service on path `/y`
const createService = require('feathers-knex');
const createModel = require('../../models/bookings.model');
const hooks = require('./bookings.hooks');
const filters = require('./bookings.filters');

module.exports = function() {
    const app = this;
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        name: 'bookings',
        Model,
        paginate
    };

    // Initialize our service with any options it requires
    app.use('/bookings', createService(options));

    // Get our initialized service so that we can register hooks and filters
    const service = app.service('bookings');

    service.hooks(hooks);

    if (service.filter) {
        service.filter(filters);
    }
};
