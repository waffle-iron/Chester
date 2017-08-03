// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const moment = require('moment');
module.exports = function(options = {}) {
    // eslint-disable-line no-unused-vars
    return function setLoginHistory(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
        const recentLogin = {};
        // How many logins to store
        const historyLogAmount = 10;
        const date = moment().format();
        recentLogin[date] = {
            ip: hook.params.ip,
            user_agent: hook.params.headers['user-agent'],
            origin: hook.params.headers.origin
        };
        hook.app
            .service('users')
            .find({
                email: hook.data.email
            })
            .then(profile => {
                const user = profile.data[0];
                const history = user.login_history;
                if (Object.keys(history).length >= historyLogAmount) {
                    // It deletes the first object ín the JSON object
                    // its the oldest login
                    delete history[Object.keys(history)[0]];
                }
                user.login_history = Object.assign(history, recentLogin);

                hook.app
                    .service('users')
                    .patch(user.id, { login_history: user.login_history })
                    .then(_ => {
                        return Promise.resolve(hook);
                    });
            });
    // return Promise.resolve(hook);
    };
};
