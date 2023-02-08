exports.up = function(knex) {
    return knex.schema.createTable('user',(table)=>{
      table.increments('id');
      table.bigint('userId').notNullable();
      table.string('userName');
      table.string('firstName');
      table.string('lastName');
      table.boolean('isActive').notNullable();
      table.boolean('isLogin').notNullable();
    })
  };
  
   
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
  