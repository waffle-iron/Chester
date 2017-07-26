const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');
const setDeletedAt = require('../../hooks/setDeletedAt');

const { hashPassword } = require('feathers-authentication-local').hooks;

const restrict = [
    authenticate('jwt'),
    restrictToOwner({
        idField: 'id',
        ownerField: 'id'
    })
];

module.exports = {
    before: {
        all: [commonHooks.softDelete()],
        find: [authenticate('jwt')],
        get: [...restrict],
        create: [hashPassword(), commonHooks.setCreatedAt('created_at')],
        update: [
            ...restrict,
            hashPassword(),
            commonHooks.setCreatedAt('updated_at')
        ],
        patch: [
            ...restrict,
            hashPassword(),
            commonHooks.setCreatedAt('updated_at')
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
