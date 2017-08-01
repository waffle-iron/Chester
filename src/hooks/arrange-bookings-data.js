// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function(options = {}) {
    const template = require('../schemas/bookings.template.json');
    const mapper = require('../lib/mapper');
    // eslint-disable-line no-unused-vars
    return function arrangeBookingsData(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations

        switch (hook.method) {
        case 'find':
            mapper(hook.result.data, template).then(result => {
                hook.result.data = result;
                return hook;
            });
            break;
        }
    // return Promise.resolve(hook);
    };
};
