// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function(options = {}) {
    const mapper = require('../lib/mapper');
    // eslint-disable-line no-unused-vars
    return function mapData(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations

    // I'm pretty sure this is a bad way to check which service it is..
        let service = hook.service.table;
        let path = '../schemas/' + service + '/' + service;
        const inTemplate = require(path + '.in.template.json');
        const outTemplate = require(path + '.out.template.json');
        switch (hook.method) {
        case 'find':
            return mapper(hook.result.data, outTemplate).then(result => {
                hook.result.data = result;
                return hook;
            });
        case 'get':
            return mapper(hook.result, outTemplate).then(result => {
                hook.result = result;
                return hook;
            });
        case 'create':
            return mapper(hook.data, inTemplate).then(result => {
                hook.data = result;
                return hook;
            });
        }
    };
};
