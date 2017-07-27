module.exports = function() {
    const getIp = require('./getIpOfRequest');
    // Add your custom middleware here. Remember, that
    // in Express the order matters
    const app = this; // eslint-disable-line no-unused-vars

    app.use(getIp);
};
