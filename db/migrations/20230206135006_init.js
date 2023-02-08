exports.up = function(knex) {
    return knex.schema.createTable('users',(table)=>{
      table.increments('id');
      table.bigint('userId').notNullable();
      table.boolean('isActive').notNullable();
      table.string('password').notNullable();
      table.string('userName').notNullable();
    })
  };
  
   
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
  