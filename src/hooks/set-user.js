// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function(options = {}) {
    // eslint-disable-line no-unused-vars
    return function setUser(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
        hook.data.user_id = hook.params.user.id;

        return Promise.resolve(hook);
    };
};
