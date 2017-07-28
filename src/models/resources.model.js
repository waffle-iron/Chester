/* eslint-disable no-console */

// Resources-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function(app) {
    const db = app.get('knexClient');

    db.schema.hasTable('resources').then(exists => {
        if (!exists) {
            db.schema
                .createTable('resources', table => {
                    table.increments('id').primary();
                    table.string('name').notNullable();
                    table.string('type').notNullable();
                    table.boolean('active').notNullable().defaultTo(true);
                    table.string('timezone').notNullable();
                    table.json('details').notNullable();
                    table.json('rules').notNullable();

                    table.timestamp('created_at').notNullable();
                    table.timestamp('updated_at');
                    table.timestamp('deleted_at');
                    table.boolean('deleted').defaultTo(false);
                })
                .then(
                    () => console.log('Updated resources table'),
                    e => console.error('Error updating resources table', e)
                );
        }
    });

    return db;
};
