exports.up = function (knex) {
  return knex.schema.createTable("group", (table) => {
    table.increments("id");
    table.bigint("groupId");
    table.string("title");
    table.string("type");
    table.bigint("userId").references("id").inTable("user");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("group");
};
