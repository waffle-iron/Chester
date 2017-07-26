const users = require('./users/users.service.js');
const resources = require('./resources/resources.service.js');
const findTime = require('./find-time/find-time.service.js');
const quickBook = require('./quick-book/quick-book.service.js');
const bookings = require('./bookings/bookings.service.js');
module.exports = function() {
    const app = this; // eslint-disable-line no-unused-vars
    app.configure(users);
    app.configure(resources);
    app.configure(findTime);
    app.configure(quickBook);
    app.configure(bookings);
};
