const { authenticate } = require('feathers-authentication').hooks;
const ajv = require('ajv')({ allErrors: true, $data: true });
require('ajv-keywords')(ajv, 'select');
const {
    setCreatedAt,
    setUpdatedAt,
    softDelete,
    validateSchema
} = require('feathers-hooks-common');
const setDeletedAt = require('../../hooks/setDeletedAt');
const illegalTimeChecker = require('../../hooks/illegalTimeChecker');
const setUser = require('../../hooks/set-user');
const validationSchema = require('../../schemas/bookings.validation.json');
const mapData = require('../../hooks/map-data');

module.exports = {
    before: {
        all: [authenticate('jwt'), softDelete()],
        find: [],
        get: [],
        create: [
            validateSchema(validationSchema, ajv),
            illegalTimeChecker(),
            setCreatedAt('created_at'),
            setUser()
        ],
        update: [setUpdatedAt('updated_at')],
        patch: [setUpdatedAt('updated_at')],
        remove: [setDeletedAt()]
    },

    after: {
        all: [mapData()],
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
