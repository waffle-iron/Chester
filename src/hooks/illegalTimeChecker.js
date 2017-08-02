// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('feathers-errors');
const moment = require('moment');

module.exports = function(options = {}) {
    // eslint-disable-line no-unused-vars
    return hook => {
        const app = hook.app;
        // Hooks can either return nothing or a promise
        // that resolves with the `hook` object for asynchronous operations
        const start = moment(hook.data.event_start).valueOf();
        const end = moment(hook.data.event_end).valueOf();

        if (
            !moment(hook.data.event_start).isValid() |
      !moment(hook.data.event_end).isValid()
        ) {
            throw new errors.BadRequest(
                'Wrong format of time. Use the ISO8601 time format. Read more here: https://en.wikipedia.org/wiki/ISO_8601'
            );
        }
        if (start > end) {
            throw new errors.BadRequest('Start time has to be before the end time.');
        }
        return (
            app
                .service('resources')
                .get(hook.data.resource_id)
                .then(resource => {
                    if (resource.allow_double_booking === true) {
                        Promise.resolve(hook);
                    } else {
                        // return a promise with the bookings
                        return app.service('bookings').find({
                            query: {
                                $or: [
                                    {
                                        completed: false,
                                        resource_id: resource.id,
                                        event_start: {
                                            $gte: hook.data.event_start,
                                            $lt: hook.data.event_end
                                        }
                                    },
                                    {
                                        completed: false,
                                        resource_id: resource.id,
                                        event_end: {
                                            $gt: hook.data.event_start,
                                            $lte: hook.data.event_end
                                        }
                                    }
                                ]
                            }
                        });
                    }
                })
        // Open the booking promise
                .then(bookings => {
                    if (bookings) {
                        if (bookings.total > 0) {
                            throw new errors.BadRequest(
                                'Overlapping timeframe, pick another time'
                            );
                        }
                    } else {
                        Promise.resolve(hook);
                    }
                })
        );
    // ;
    };
};
