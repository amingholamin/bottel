exports.up = function(knex) {
    return knex.schema.createTable('blacklist',(table)=>{
      table.increments('id');
      table.bigint('groupId').notNullable();
      table.string('word');

    })
  };
  
   
  exports.down = function(knex) {
    return knex.schema.dropTable('blacklist');
  };
  