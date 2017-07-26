const { authenticate } = require('feathers-authentication').hooks;
const {
    setCreatedAt,
    setUpdatedAt,
    softDelete
} = require('feathers-hooks-common');
const setDeletedAt = require('../../hooks/setDeletedAt');
const illegalTimeChecker = require('../../hooks/illegalTimeChecker');

module.exports = {
    before: {
        all: [authenticate('jwt'), softDelete()],
        find: [],
        get: [],
        create: [illegalTimeChecker(), setCreatedAt('created_at')],
        update: [setUpdatedAt('updated_at')],
        patch: [setUpdatedAt('updated_at')],
        remove: [setDeletedAt()]
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
