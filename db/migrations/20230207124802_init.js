exports.up = function(knex) {
    return knex.schema.createTable('group',(table)=>{
      table.increments('id');
      table.bigint('groupId').notNullable();
      table.string('title');
      table.boolean('isActive').notNullable();
      table.bigint("userId").references('id').inTable('user')
    })
  };
  
   
  exports.down = function(knex) {
    return knex.schema.dropTable('group');
  };
  