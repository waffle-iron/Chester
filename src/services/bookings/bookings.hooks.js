const { authenticate } = require('feathers-authentication').hooks;
const ajv = require('ajv')({ allErrors: true, $data: true });
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
const bookingReducer = require('../../hooks/booking-reducer');

require('ajv-keywords')(ajv, 'select');

module.exports = {
    before: {
        all: [authenticate('jwt'), softDelete(), bookingReducer()],
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
