const ajv = require('ajv')({ allErrors: true, $data: true });
const { authenticate } = require('feathers-authentication').hooks;
const { validateSchema } = require('feathers-hooks-common');
const setDeletedAt = require('../../hooks/setDeletedAt');
const validationSchema = require('../../schemas/resources/resources.validation.json');

require('ajv-keywords')(ajv, 'select');

const {
    softDelete,
    setCreatedAt,
    setUpdatedAt
} = require('feathers-hooks-common');

const mapData = require('../../hooks/map-data');

module.exports = {
    before: {
        all: [
            authenticate('jwt')
            // softDelete()
        ],
        find: [],
        get: [],
        create: [
            validateSchema(validationSchema, ajv),
            mapData(),
            setCreatedAt('created_at')
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
