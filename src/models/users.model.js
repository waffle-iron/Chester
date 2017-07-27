/* eslint-disable no-console */

// users-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function(app) {
    const db = app.get('knexClient');

    db.schema.hasTable('users').then(exists => {
        if (!exists) {
            db.schema
                .createTable('users', table => {
                    table.increments('id');

                    table.string('firstname');
                    table.string('lastname');
                    table.string('email').unique();
                    table.string('password');
                    table.integer('security_level').notNullable().defaultTo(0); // 0 - user, 1 - admin, 2 - superadmin

                    table.timestamp('last_seen');
                    table.json('last_logins');

                    table.timestamp('created_at').notNullable();
                    table.timestamp('updated_at');
                    table.timestamp('deleted_at');
                    table.boolean('deleted').defaultTo(false);
                })
                .then(
                    () => console.log('Updated users table'),
                    e => console.error('Error updating users table', e)
                );
        }
    });

    return db;
};
