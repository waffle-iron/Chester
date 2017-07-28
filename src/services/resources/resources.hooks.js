const { authenticate } = require('feathers-authentication').hooks;
const setDeletedAt = require('../../hooks/setDeletedAt');

const {
    softDelete,
    setCreatedAt,
    setUpdatedAt
} = require('feathers-hooks-common');

module.exports = {
    before: {
        all: [authenticate('jwt'), softDelete()],
        find: [],
        get: [],
        create: [setCreatedAt('created_at')],
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
