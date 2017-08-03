const ajv = require('ajv')({ allErrors: true, $data: true });
const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');
const setDeletedAt = require('../../hooks/setDeletedAt');
const validationSchema = require('../../schemas/users/users.validation.json');
const { hashPassword } = require('feathers-authentication-local').hooks;

require('ajv-keywords')(ajv, 'select');

const restrict = [
    authenticate('jwt'),
    restrictToOwner({
        idField: 'id',
        ownerField: 'id'
    })
];

const mapData = require('../../hooks/map-data');

module.exports = {
    before: {
        all: [
            // commonHooks.softDelete()
        ],
        find: [authenticate('jwt')],
        get: [...restrict],
        create: [
            commonHooks.validateSchema(validationSchema, ajv),
            hashPassword(),
            commonHooks.setCreatedAt('created_at')
        ],
        update: [
            ...restrict,
            hashPassword(),
            commonHooks.setUpdatedAt('updated_at')
        ],
        patch: [
            ...restrict,
            hashPassword(),
            commonHooks.setUpdatedAt('updated_at')
        ],
        remove: [...restrict, setDeletedAt()]
    },

    after: {
        all: [
            commonHooks.when(
                hook => hook.params.provider,
                commonHooks.discard('password')
            )
        ],
        find: [mapData()],
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
