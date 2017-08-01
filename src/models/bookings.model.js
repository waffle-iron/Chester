/* eslint-disable no-console */

// Bookings-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function(app) {
    const db = app.get('knexClient');

    db.schema.hasTable('bookings').then(exists => {
        if (!exists) {
            db.schema
                .createTable('bookings', table => {
                    table.increments('id').primary();
                    table.integer('user_id').notNullable();
                    table.integer('resource_id').unsigned().notNullable();
                    table.foreign('resource_id').references('resources.id');
                    table.string('title').notNullable();
                    table.string('type').notNullable();
                    table.boolean('completed').notNullable().defaultTo(false);
                    table.string('event_description');
                    table.string('event_location');
                    table.json('event_participants');
                    table.timestamp('event_start').notNullable();
                    table.timestamp('event_end').notNullable();
                    table
                        .integer('event_timezone_offset')
                        .notNullable()
                        .defaultTo(new Date().getTimezoneOffset());

                    table.timestamp('created_at').notNullable();
                    table.timestamp('updated_at');
                    table.timestamp('deleted_at');
                    table.boolean('deleted').defaultTo(false);
                })
                .then(
                    () => console.log('Updated bookings table'),
                    e => console.error('Error updating bookings table', e)
                );
        }
    });

    return db;
};
