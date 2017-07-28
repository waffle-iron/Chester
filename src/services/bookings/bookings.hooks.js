const { authenticate } = require('feathers-authentication').hooks;
const {
  setCreatedAt,
  setUpdatedAt,
  softDelete
} = require('feathers-hooks-common');
const setDeletedAt = require('../../hooks/setDeletedAt');
const illegalTimeChecker = require('../../hooks/illegalTimeChecker');
const setUser = require('../../hooks/set-user');

const validator = require('../../hooks/validator');

module.exports = {
    before: {
        all: [authenticate('jwt'), softDelete()],
        find: [],
        get: [],
        create: [
            illegalTimeChecker(),
            validator(),
            setCreatedAt('created_at'),
            setUser()
        ],
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
