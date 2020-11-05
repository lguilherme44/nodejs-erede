exports.up = function (knex) {
  return knex.schema.createTable('payments', function (table) {
    table.increments('id');
    table.string('tid').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('payments');
};
