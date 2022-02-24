
exports.up = function(knex) {
  return knex.schema
    .createTable('pokemon', tbl => {
        tbl.increments('pokemon_id');
        tbl.string('pokemon_name', 128).notNullable().unique();
    })
    .createTable('moves', tbl => {
        tbl.increments('move_id');
        tbl.string('move_name', 128).notNullable().unique();
        tbl.string('move_type').notNullable();
    })
    .createTable('pokemon_moves', tbl => {
        tbl.integer('pokemon_id')
            .unsigned()
            .notNullable()
            .references('pokemon_id')
            .inTable('pokemon')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.integer('move_id')
            .unsigned()
            .notNullable()
            .references('move_id')
            .inTable('moves')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.primary(['pokemon_id', 'move_id']);
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('pokemon_moves')
    .dropTableIfExists('moves')
    .dropTableIfExists('pokemon');
};
